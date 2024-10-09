// app/components/Sidebar.js
import Link from 'next/link';

export default function Sidebar() {
    return (
        <aside className="w-64 bg-zinc-800 h-screen p-6">
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
                <Link href="/dashboard/profile" className="block text-white hover:bg-emerald-500 hover:text-white p-2 rounded transition duration-300">
                    Profile
                </Link>
                <Link href="/" className="block text-red-500 hover:bg-red-600 hover:text-white p-2 rounded transition duration-300">
                    Logout
                </Link>
            </nav>
        </aside>
    );
}
