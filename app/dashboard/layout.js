import Sidebar from "@/components/Sidebar";

export const metadata = {
    title: 'TaskFlow Dashboard',
    description: 'Manage your tasks efficiently.',
};

export default function DashboardLayout({ children }) {
    return (
        <div className="h-screen flex bg-zinc-950 text-white">
            <Sidebar />
            {children}
        </div>
    );
}
