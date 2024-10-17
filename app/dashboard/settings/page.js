"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AccountSettings from "./AccountSettings";
import DeleteAccountModal from "@/components/DeleteAccountModal";

export default function Settings() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch('/api/settings/getUsername');
                const data = await response.json();
                if (response.ok) {
                    setName(data.name);
                    setError(null); // Clear error on successful fetch
                } else {
                    setName('......');
                    setError(data.message || 'Failed to fetch username.');
                }
            } catch (error) {
                setName('......');
                setError("Error fetching username.");
                console.error("Error fetching username:", error);
            }
        };

        fetchUsername();
    }, []);

    // Pop-up Account Deletion
    const [isDeleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);

    const handleAccountDeletion = async (deletePassword) => {
        try {
            const response = await fetch('/api/settings/deleteAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: deletePassword }), 
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message); // Display success message
                setDeleteAccountModalOpen(false);
                router.push("/"); // Redirect after account deletion
            } else {
                alert(data.message); // Display error message if deletion failed
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("Failed to delete account. Please try again.");
        }
    };

    return (
        <div className="lg:ml-52 w-full bg-zinc-950 min-h-screen p-4 lg:p-8 text-white">
            <AccountSettings
                name={name}
                error={error}
                openChangePasswordModal={() => setChangePasswordModalOpen(true)}
                openDeleteAccountModal={() => setDeleteAccountModalOpen(true)}
            />

            {isDeleteAccountModalOpen && (
                <DeleteAccountModal
                    closeDeleteAccountModal={() => setDeleteAccountModalOpen(false)}
                    handleAccountDeletion={handleAccountDeletion}
                />
            )}
        </div>
    );
}
