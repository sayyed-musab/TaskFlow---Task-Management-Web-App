"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AccountSettings from "./AccountSettings";
import ChangePasswordModal from "@/components/ChangePasswordModal";
import DeleteAccountModal from "@/components/DeleteAccountModal";

export default function Settings() {
    const router = useRouter();
    const [name] = useState("Your Name");
    const [theme, setTheme] = useState("System Default");

    // Pop-up for Change Passowrd & Account Deletion
    const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
    const [isDeleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);

    // For Account Deletion 
    const [deletePassword, setDeletePassword] = useState("");
    const [isDeleteConfirmationChecked, setDeleteConfirmationChecked] = useState(false);

    const handleChangePassword = (data) => {
        const { currentPassword, newPassword, confirmPassword } = data;
        if (currentPassword === "your_password") {
            if (newPassword === confirmPassword) {
                alert("Password changed successfully!");
                setChangePasswordModalOpen(false);
            } else {
                alert("New passwords do not match!");
            }
        } else {
            alert("Current password is incorrect!");
        }
    };

    const handleAccountDeletion = () => {
        if (deletePassword === "your_password" && isDeleteConfirmationChecked) {
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
                theme={theme}
                setTheme={setTheme}
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
