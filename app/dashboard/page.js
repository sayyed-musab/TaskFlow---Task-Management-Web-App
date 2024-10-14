"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import DeleteConfirmationModal from '@/components/DeleteTaskConfirmationModal';

const initialTasks = [
    { id: 1, title: 'Complete project report', status: 'In Progress', dueDate: '2024-10-15' },
    { id: 2, title: 'Prepare presentation slides', status: 'Pending', dueDate: '2024-10-20' },
    { id: 3, title: 'Review team performance', status: 'In Progress', dueDate: '2024-10-18' },
    { id: 4, title: 'Meeting with the client', status: 'Completed', dueDate: '2024-10-01' },
];

// Function to get the count of overdue tasks
const getOverdueTasksCount = (tasks) => {
    const today = new Date();
    return tasks.filter(task => new Date(task.dueDate) < today && task.status !== 'Completed').length;
};

// Function to get the count of uncompleted tasks
const getUncompletedTasksCount = (tasks) => {
    return tasks.filter(task => task.status !== 'Completed').length;
};

export default function Dashboard() {
    const [tasks, setTasks] = useState(initialTasks);
    const [deleteTaskId, setDeleteTaskId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const overdueTasksCount = getOverdueTasksCount(tasks);
    const uncompletedTasksCount = getUncompletedTasksCount(tasks);

    const toggleTaskStatus = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, status: task.status === 'Pending' ? 'In Progress' : 'Pending' } : task
        ));
    };

    const handleCheckboxChange = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, status: task.status === 'Completed' ? 'Pending' : 'Completed' } : task
        ));
    };

    const handleDeleteTask = () => {
        setTasks(tasks.filter(task => task.id !== deleteTaskId));
        setDeleteTaskId(null);
        setShowDeleteModal(false);
    };

    const sortedTasks = tasks.slice().sort((a, b) => {
        if (a.status === 'Completed' && b.status !== 'Completed') return 1;
        if (a.status !== 'Completed' && b.status === 'Completed') return -1;
        return 0;
    });

    return (
        <div className="lg:ml-52 bg-zinc-950 min-h-screen overflow-y-scroll w-full text-white p-4 lg:p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Dashboard</h1>

            {/* Task Overview */}
            <div className="mb-8 p-6 select-none bg-zinc-800 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-semibold mb-4">Task Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <p className="text-lg">Overdue Tasks: <span className="font-bold text-red-500">{overdueTasksCount}</span></p>
                    </div>
                    <div>
                        <p className="text-lg">Uncompleted Tasks: <span className="font-bold">{uncompletedTasksCount}</span></p>
                    </div>
                </div>
                <div className="mt-4">
                    <Link href="/dashboard/tasks/create" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                        Create New Task
                    </Link>
                </div>
            </div>

            {/* Task List */}
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">Your Tasks</h2>
            <div className="bg-zinc-800 rounded-lg shadow-lg p-4">
                <ul className="space-y-4">
                    {sortedTasks.map(task => (
                        <li key={task.id} className={`flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-lg ${new Date(task.dueDate) < new Date() && task.status !== 'Completed' ? 'bg-red-600' : 'bg-zinc-700'}`}>
                            <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-x-4 md:space-y-0">
                                <input
                                    type="checkbox"
                                    checked={task.status === 'Completed'}
                                    onChange={() => handleCheckboxChange(task.id)}
                                    className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                />
                                <h3 className="text-lg font-bold">{task.title}</h3>
                                <p className="text-gray-400">Due: {task.dueDate}</p>
                            </div>
                            <div className="flex gap-4">
                                {task.status !== 'Completed' && (
                                    <div
                                        className={`mt-4 md:mt-0 px-2 py-1 text-sm font-semibold rounded-full select-none cursor-pointer ${task.status === 'In Progress' ? 'bg-yellow-500' : 'bg-gray-500'}`}
                                        onClick={() => toggleTaskStatus(task.id)}
                                    >
                                        {task.status}
                                    </div>
                                )}
                                {/* Delete Button */}
                                <button
                                    onClick={() => {
                                        setDeleteTaskId(task.id);
                                        setShowDeleteModal(true);
                                    }}
                                    className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded transition duration-300"
                                >
                                    <Image
                                        src="/icons/delete.svg"
                                        alt="Delete"
                                        width={20}
                                        height={20}
                                        className="rounded-lg shadow-lg"
                                    />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
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
