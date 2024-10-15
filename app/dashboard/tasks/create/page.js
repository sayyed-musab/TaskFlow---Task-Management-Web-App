"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTask() {
    const [task, setTask] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("Pending");
    const [createTaskErrMsg, setCreateTaskErrMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setCreateTaskErrMsg("");

        try {
            const response = await fetch('/api/tasks/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: task, status, dueDate }),
            });

            if (response.ok) {
                router.push("/dashboard");
            } else {
                const errorData = await response.json();
                setCreateTaskErrMsg(errorData.message || "Failed to create task.");
            }
        } catch (error) {
            setCreateTaskErrMsg("An error occurred while creating the task.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="lg:ml-52 bg-zinc-950 min-h-screen p-6 lg:p-8 flex w-full items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-zinc-800 rounded-lg shadow-lg p-8 max-w-md w-full space-y-6"
            >
                <h1 className="text-3xl font-bold text-center text-white">Create New Task</h1>
                {createTaskErrMsg && <p className="text-red-400 text-center">{createTaskErrMsg}</p>}
                <div className="flex items-center justify-center">
                    <div className={isSubmitting ? "spinner" : ""}></div>
                </div>
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
                    disabled={isSubmitting}
                >
                    Create Task
                </button>
            </form>
        </div>
    );
}
