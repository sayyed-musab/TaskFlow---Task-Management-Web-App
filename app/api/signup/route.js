import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
    const { name, email, password } = await req.json();

    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        await client.connect();

        // name of db
        const database = client.db(process.env.DB_NAME);

        // name of the collection
        const collection = database.collection("users");

        // Check if the user already exists
        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return new Response(
                JSON.stringify({ message: "User already exists!" }),
                { status: 409 } // Conflict status
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert a new user document with hashed password
        await collection.insertOne({ name, email, password: hashedPassword });

        // Create a JWT token
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });


        // Set the token as a cookie
        const headers = new Headers();
        headers.append('Set-Cookie',
            `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}` // 7 days in seconds
        );


        return new Response(
            JSON.stringify({ message: "User created successfully!" }),
            { status: 201, headers }
        );

    } catch (error) {
        console.error('Error saving data:', error); // Log error for debugging
        return new Response(JSON.stringify({ message: "Oops! Something went wrong. Please try again later." }), { status: 500 });
    } finally {
        await client.close();
    }
}
