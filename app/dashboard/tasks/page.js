"use client";
import { useState } from "react";

const initialTasks = [
    { id: 1, title: 'Complete project report', status: 'In Progress', dueDate: '2024-10-15' },
    { id: 2, title: 'Prepare presentation slides', status: 'Pending', dueDate: '2024-10-20' },
    { id: 3, title: 'Meeting with the client', status: 'Completed', dueDate: '2024-10-01' },
    { id: 4, title: 'Review team performance', status: 'In Progress', dueDate: '2024-10-18' },
];

export default function ViewTasks() {
    const [tasks, setTasks] = useState(initialTasks);
    const [filter, setFilter] = useState('');
    const [sortOption, setSortOption] = useState('dueDate');

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const toggleCompletion = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, status: task.status === 'Completed' ? 'Pending' : 'Completed' } : task));
    };

    const toggleStatus = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, status: task.status === 'Pending' ? 'In Progress' : 'Pending' } : task
        ));
    };

    // Filter tasks based on status
    const filteredTasks = tasks.filter(task => filter === '' || task.status === filter);

    // Sort tasks based on selected option (status or dueDate)
    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sortOption === 'status') {
            return a.status.localeCompare(b.status);
        } else {
            return new Date(a.dueDate) - new Date(b.dueDate);
        }
    });

    return (
        <div className="lg:ml-64 bg-zinc-950 min-h-screen overflow-scroll w-full text-white p-4 lg:p-8">
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
                            <tr key={task.id} className={`border-b border-zinc-600 ${new Date(task.dueDate) < new Date() && task.status !== 'Completed' ? 'bg-red-600' : 'bg-zinc-700'}`}>
                                <td className="px-4 py-2">
                                    <input
                                        type="checkbox"
                                        checked={task.status === 'Completed'}
                                        onChange={() => toggleCompletion(task.id)}
                                        className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                    />
                                </td>
                                <td className="px-4 py-2">{task.title}</td>
                                <td className="px-4 py-2">{task.dueDate}</td>
                                <td className="px-4 py-2">
                                    {task.status === 'Completed' ? (
                                        <span className="text-gray-400">Completed</span>
                                    ) : (
                                        <button
                                            onClick={() => toggleStatus(task.id)}
                                            className={`px-2 py-1 text-sm font-semibold rounded-full cursor-pointer ${
                                                task.status === 'In Progress' ? 'bg-yellow-500' : 'bg-gray-500'
                                            }`}
                                        >
                                            {task.status}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
