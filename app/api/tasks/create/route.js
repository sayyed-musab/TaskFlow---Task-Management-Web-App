import { MongoClient } from "mongodb";
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

async function getUserIdFromToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.email; // Assuming the user ID is the email in this case
  } catch (error) {
    return null;
  }
}

export async function POST(req) {
  const { title, status, dueDate } = await req.json();
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = await getUserIdFromToken(token);

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const database = client.db(process.env.DB_NAME);
    const collection = database.collection("tasks");

    const task = {
      title,
      status,
      dueDate,
      userId,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(task);
    return NextResponse.json({ message: "Task created successfully!"}, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: `Something went wrong. ${error}` }, { status: 500 });
  } finally {
    await client.close();
  }
}

