"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', { method: 'POST' });
            if (response.ok) {
                router.push('/')
            } else {
                alert('Failed to logout')
            }
        } catch {
            alert('Failed to logout')
        }
    };

    return (
        <>
            {/* Menu Button for Mobile */}

            <div className="lg:hidden p-2 bg-zinc-800">
                <button
                    onClick={toggleSidebar}
                    className="text-white focus:outline-none"
                >
                    {/* Icon for Menu */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 bg-zinc-800 h-screen p-6 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-48 md:w-52`}>
                <h2 className="text-2xl font-bold text-white mb-6">TaskFlow</h2>
                <nav className="space-y-4">
                    <Link href="/dashboard" className="block text-white hover:bg-emerald-500 hover:text-white p-2 rounded transition duration-300">
                        Dashboard
                    </Link>
                    <Link href="/dashboard/tasks" className="block text-white hover:bg-emerald-500 hover:text-white p-2 rounded transition duration-300">
                        View Tasks
                    </Link>
                    <Link href="/dashboard/tasks/create" className="block text-white hover:bg-emerald-500 hover:text-white p-2 rounded transition duration-300">
                        Create New Task
                    </Link>
                    <Link href="/dashboard/settings" className="block text-white hover:bg-emerald-500 hover:text-white p-2 rounded transition duration-300">
                        Settings
                    </Link>
                    <button onClick={handleLogout} className="block text-red-500 hover:bg-red-600 hover:text-white p-2 rounded transition duration-300">
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Overlay for mobile to close sidebar */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 lg:hidden"
                    onClick={toggleSidebar}>
                </div>
            )}
        </>
    );
}
