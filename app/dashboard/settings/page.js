"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AccountSettings from "./AccountSettings";
import ChangePasswordModal from "@/components/ChangePasswordModal";
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
                    setError(data.message || 'Failed to fetch username.'); // Show a relevant error message
                }
            } catch (error) {
                setName('......');
                setError("Error fetching username."); // Handle general fetch error
                console.error("Error fetching username:", error);
            }
        };

        fetchUsername();
    }, []);

    // Pop-up for Change Password & Account Deletion
    const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
    const [isDeleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);

    // For Account Deletion 
    const [deletePassword, setDeletePassword] = useState("");
    const [isDeleteConfirmationChecked, setDeleteConfirmationChecked] = useState(false);

    const handleChangePassword = async (data) => {
        const { currentPassword, newPassword, confirmPassword } = data;
        
        // Replace with API call to verify current password and change it
        if (currentPassword && newPassword === confirmPassword) {
            // Call to API for password change goes here
            alert("Password changed successfully!");
            setChangePasswordModalOpen(false);
        } else {
            alert("New passwords do not match or current password is incorrect!");
        }
    };

    const handleAccountDeletion = async () => {
        // Replace with actual API call for account deletion
        if (deletePassword && isDeleteConfirmationChecked) {
            alert("Account deleted successfully!");
            setDeleteAccountModalOpen(false);
            router.push("/");
        } else {
            alert("Incorrect password or confirmation not checked.");
        }
    };

    return (
        <div className="lg:ml-52 w-full bg-zinc-950 min-h-screen p-4 lg:p-8 text-white">
            <AccountSettings
                name={name}
                error={error} // Pass the error message to AccountSettings for display
                openChangePasswordModal={() => setChangePasswordModalOpen(true)}
                openDeleteAccountModal={() => setDeleteAccountModalOpen(true)}
            />

            {isChangePasswordModalOpen && (
                <ChangePasswordModal
                    closeChangePasswordModal={() => setChangePasswordModalOpen(false)}
                    handleChangePassword={handleChangePassword}
                />
            )}

            {isDeleteAccountModalOpen && (
                <DeleteAccountModal
                    closeDeleteAccountModal={() => setDeleteAccountModalOpen(false)}
                    handleAccountDeletion={handleAccountDeletion}
                    deletePassword={deletePassword}
                    setDeletePassword={setDeletePassword}
                    isDeleteConfirmationChecked={isDeleteConfirmationChecked}
                    setDeleteConfirmationChecked={setDeleteConfirmationChecked}
                />
            )}
        </div>
    );
}
