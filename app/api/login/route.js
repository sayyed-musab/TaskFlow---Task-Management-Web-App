import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
    const { email, password } = await req.json();

    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        await client.connect();

        // name of db
        const database = client.db(process.env.DB_NAME);

        // name of the collection
        const collection = database.collection("users");

        // Check if the user exists
        const user = await collection.findOne({ email });
        if (!user) {
            return new Response(
                JSON.stringify({ message: "Invalid credentials." }),
                { status: 401 } // Unauthorized status
            );
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return new Response(
                JSON.stringify({ message: "Invalid credentials." }),
                { status: 401 } // Unauthorized status
            );
        }

        // Create a JWT token
        const token = jwt.sign({ email }, process.env.JWT_SECRET);

        // Set the token as a cookie
        const headers = new Headers();
        headers.append('Set-Cookie', `token=${token}`);

        return new Response(
            JSON.stringify({ message: "Login successful!" }),
            { status: 200, headers }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Oops! Something went wrong. Please try again later." }),
            { status: 500 }
        );
    } finally {
        await client.close();
    }
}
