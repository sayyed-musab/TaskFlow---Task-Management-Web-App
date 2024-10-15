import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET(req) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let email;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        email = decoded.email;  // Ensure you're decoding email properly from the JWT
    } catch (error) {
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    try {
        await client.connect();
        const database = client.db(process.env.DB_NAME);
        const collection = database.collection("users");

        // Find user by email and return the username
        const user = await collection.findOne({ email: email });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ name: user.name });  // Return the username as JSON
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ message: "Failed to fetch user" }, { status: 500 });
    } finally {
        await client.close();
    }
}
