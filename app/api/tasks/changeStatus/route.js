import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function PUT(req) {
    const { id, status } = await req.json(); // Get the task ID and new status from the request body
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

        // Check if the task belongs to the logged-in user
        const task = await collection.findOne({ _id: new ObjectId(id), userId: userId });

        if (!task) {
            return NextResponse.json({ message: "Task not found or does not belong to user." }, { status: 404 });
        }

        // Update the task status
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { status: status } }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: "Failed to update task status." }, { status: 400 });
        }

        // Fetch the updated task
        const updatedTask = await collection.findOne({ _id: new ObjectId(id) });
        return NextResponse.json(updatedTask);
    } catch (error) {
        console.error("Error updating task status:", error);
        return NextResponse.json({ message: "Failed to update task status." }, { status: 500 });
    } finally {
        await client.close();
    }
}
