import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function DELETE(req) {
    const { id } = await req.json();
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

        // Delete the task
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "Failed to delete task." }, { status: 400 });
        }

        return NextResponse.json({ message: "Task deleted successfully." });
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json({ message: "Failed to delete task." }, { status: 500 });
    } finally {
        await client.close();
    }
}
