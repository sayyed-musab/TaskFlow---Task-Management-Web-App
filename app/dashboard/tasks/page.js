"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import DeleteConfirmationModal from "@/components/DeleteTaskConfirmationModal";

const changeStatus = async (id, newStatus) => {
    try {
        const response = await fetch('/api/tasks/changeStatus', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, status: newStatus }),
        });

        if (!response.ok) {
            alert('Failed to update task status');
            return;
        }
        const updatedTask = await response.json();
        return updatedTask;
    } catch (error) {
        alert('Error updating task status: ' + error.message);
        return;
    }
};
export default function ViewTasks() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortOption, setSortOption] = useState('dueDate');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTaskId, setDeleteTaskId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    async function fetchTasks() {
        try {
            const response = await fetch("/api/tasks/getAllTasks", { method: "GET" });
            const data = await response.json();
            if (response.ok) {
                setTasks(data);
            } else {
                setError("Error fetching tasks:", data.message);
            }
        } catch (error) {
            setError("Error fetching tasks:", error);
        }
        finally {
            setLoading(false);
        }
    }

    // Fetch tasks from the API when the component mounts
    useEffect(() => {
        fetchTasks();
    }, []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const handleCheckboxChange = async (id) => {
        const taskToUpdate = tasks.find(task => task._id === id);

        if (!taskToUpdate) {
            alert('Task not found');
            return;
        }

        const newStatus = taskToUpdate.status === 'Completed' ? 'Pending' : 'Completed';

        try {
            const updatedTask = await changeStatus(taskToUpdate._id.toString(), newStatus);
            setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
        } catch (error) {
            alert(error.message);
        }
    };

    const toggleTaskStatus = async (id) => {
        const taskToUpdate = tasks.find(task => task._id === id);

        if (!taskToUpdate) {
            alert('Task not found');
            return;
        }

        const newStatus = taskToUpdate.status === 'Pending' ? 'In Progress' : 'Pending';

        try {
            const updatedTask = await changeStatus(taskToUpdate._id.toString(), newStatus);
            setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteTask = async () => {
        if (!deleteTaskId) return;

        const response = await fetch('/api/tasks/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: deleteTaskId }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Task deleted:", data.message);
            fetchTasks();
            setShowDeleteModal(false);
        } else {
            console.error("Error deleting task:", data.message);
        }
    };


    const filteredTasks = tasks.filter(task => filter === '' || task.status === filter);
    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sortOption === 'status') {
            return a.status.localeCompare(b.status);
        } else {
            return new Date(a.dueDate) - new Date(b.dueDate);
        }
    });

    if (loading) {
        return <div className="lg:ml-52 h-full w-full flex items-center justify-center"><div className="spinner"></div></div>;
    }

    if (error) {
        return <div className="lg:ml-52 h-full w-full flex items-center justify-center">Error: {error}</div>;
    }

    return (
        <div className="lg:ml-52 bg-zinc-950 min-h-screen overflow-y-scroll w-full text-white p-4 lg:p-8">
            <h1 className="text-4xl font-bold mb-6 text-center">View Tasks</h1>

            {/* Filter & Sort Options */}
            <div className="flex flex-wrap justify-between items-center mb-8 space-y-4 md:flex-col md:space-y-6">
                <div className="w-full md:w-full">
                    <label htmlFor="filter" className="block mb-2 text-lg font-semibold">Filter by Status:</label>
                    <select
                        id="filter"
                        value={filter}
                        onChange={handleFilterChange}
                        className="w-full bg-zinc-700 text-white p-3 rounded-md"
                    >
                        <option value="">All</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="w-full md:w-full">
                    <label htmlFor="sort" className="block mb-2 text-lg font-semibold">Sort by:</label>
                    <select
                        id="sort"
                        value={sortOption}
                        onChange={handleSortChange}
                        className="w-full bg-zinc-700 text-white p-3 rounded-md"
                    >
                        <option value="dueDate">Due Date</option>
                        <option value="status">Status</option>
                    </select>
                </div>
            </div>

            {/* Task Table */}
            <div className="bg-zinc-800 rounded-lg shadow-lg p-4 overflow-auto">
                <table className="min-w-full table-auto text-white">
                    <thead>
                        <tr className="bg-zinc-700">
                            <th className="px-4 py-2 text-left">Completed</th>
                            <th className="px-4 py-2 text-left">Task</th>
                            <th className="px-4 py-2 text-left">Due Date</th>
                            <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTasks.map(task => (
                            <tr key={task._id} className={`border-b border-zinc-600 ${new Date(task.dueDate) < new Date() && task.status !== 'Completed' ? 'bg-red-600' : 'bg-zinc-700'}`}>
                                <td className="px-4 py-2">
                                    <input
                                        type="checkbox"
                                        checked={task.status === 'Completed'}
                                        onChange={() => handleCheckboxChange(task._id)}
                                        className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                    />
                                </td>
                                <td className="px-4 py-2">{task.title}</td>
                                <td className="px-4 py-2">{task.dueDate}</td>
                                <td className="px-4 py-2 flex gap-2 items-center justify-between">
                                    {task.status === 'Completed' ? (
                                        <span className="text-gray-400">Completed</span>
                                    ) : (
                                        <button
                                            onClick={() => toggleTaskStatus(task._id)}
                                            className={`px-2 py-1 text-sm font-semibold rounded-full cursor-pointer ${task.status === 'In Progress' ? 'bg-yellow-500' : 'bg-gray-500'}`}
                                        >
                                            {task.status}
                                        </button>
                                    )}

                                    <button
                                        onClick={() => {
                                            setDeleteTaskId(task._id);
                                            setShowDeleteModal(true);
                                        }}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md min-w-[40px] flex items-center justify-center"
                                    >
                                        <Image
                                            src="/icons/delete.svg"
                                            alt="Delete"
                                            width={20}
                                            height={20}
                                            className="rounded-lg shadow-lg"
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <DeleteConfirmationModal
                    closeDeleteModal={() => setShowDeleteModal(false)}
                    handleDeleteTask={handleDeleteTask}
                />
            )}
        </div>
    );
}
