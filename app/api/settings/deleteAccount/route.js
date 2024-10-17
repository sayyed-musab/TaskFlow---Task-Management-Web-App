import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// Utility function to extract user ID from JWT token
async function getUserIdFromToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.email;
    } catch (error) {
        return null;
    }
}

export async function POST(req) {
    const { password } = await req.json();
    console.log(password)
    const token = req.cookies.get('token');
    if (!token?.value) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // User's Email ID
    const userId = await getUserIdFromToken(token.value);
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        await client.connect();
        const database = client.db(process.env.DB_NAME);
        const usersCollection = database.collection("users");
        const tasksCollection = database.collection("tasks");

        // Find the user by their email (from the token)
        const user = await usersCollection.findOne({ email: userId });
        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }


        if (!user.password) {
            return NextResponse.json({ message: "Password is missing from user data." }, { status: 500 });
        }

        // Verify password
        console.log(password)
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return NextResponse.json({ message: "Incorrect password." }, { status: 401 });
        }

        // Delete user's tasks
        await tasksCollection.deleteMany({ userId: user.email });

        // Delete user account
        await usersCollection.deleteOne({ email: user.email });

        // Clear the authentication cookie
        const headers = new Headers();
        headers.append('Set-Cookie', 'token=; Path=/; Max-Age=0');

        return NextResponse.json({ message: "Account and  tasks deleted successfully!" }, { status: 200, headers });
    } catch (error) {
        console.error('Error deleting account:', error);
        return NextResponse.json({ message: "An error occurred while deleting the account. Please try again later." }, { status: 500 });
    } finally {
        await client.close();
    }
}
