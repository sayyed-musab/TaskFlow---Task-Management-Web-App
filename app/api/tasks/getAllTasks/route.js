import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET(req) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let userId;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.email; 
    } catch (error) {
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    try {
        await client.connect();
        const database = client.db(process.env.DB_NAME);
        const collection = database.collection("tasks");

        // Fetch only incompleted tasks for the logged-in user
        const tasks = await collection.find({ 
            userId: userId, // Filter by user ID
        }).toArray();

        return NextResponse.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json({ message: "Failed to fetch tasks." }, { status: 500 });
    } finally {
        await client.close();
    }
}
