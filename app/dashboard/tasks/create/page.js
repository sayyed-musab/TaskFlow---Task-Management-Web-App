"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTask() {
    const [task, setTask] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("Pending");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit task logic here
        console.log("New Task:", { task, dueDate, status });
        router.push("/dashboard");
    };

    return (
        <div className="lg:ml-64 bg-zinc-950 min-h-screen p-6 lg:p-8 flex w-full items-center justify-center">
            <form 
                onSubmit={handleSubmit} 
                className="bg-zinc-800 rounded-lg shadow-lg p-8 max-w-md w-full space-y-6"
            >
                <h1 className="text-3xl font-bold text-center text-white">Create New Task</h1>
                
                <div>
                    <label htmlFor="task" className="block text-lg font-semibold text-white mb-2">Task</label>
                    <input
                        type="text"
                        id="task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        required
                        className="w-full bg-zinc-700 text-white p-3 rounded-md border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                <div>
                    <label htmlFor="dueDate" className="block text-lg font-semibold text-white mb-2">Due Date</label>
                    <input
                        type="date"
                        id="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                        className="w-full bg-zinc-700 text-white p-3 rounded-md border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                <div>
                    <label htmlFor="status" className="block text-lg font-semibold text-white mb-2">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full bg-zinc-700 text-white p-3 rounded-md border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded transition duration-300"
                >
                    Create Task
                </button>
            </form>
        </div>
    );
}
