"use client";

import { useForm } from "react-hook-form";

export default function ChangePasswordModal({ closeChangePasswordModal, handleChangePassword }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-zinc-800 rounded-lg p-6 shadow-lg w-96">
                <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
                <form onSubmit={handleSubmit(handleChangePassword)}>
                    <div className="mb-4">
                        <label htmlFor="current-password" className="block mb-2">Current Password:</label>
                        <input
                            type="password"
                            id="current-password"
                            {...register("currentPassword", { required: true })}
                            className="w-full bg-zinc-700 text-white p-3 rounded-md"
                        />
                        {errors.currentPassword && <p className="text-red-500 text-sm">Current password is required</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="new-password" className="block mb-2">New Password:</label>
                        <input
                            type="password"
                            id="new-password"
                            {...register("newPassword", { required: true, minLength: 8 })}
                            className="w-full bg-zinc-700 text-white p-3 rounded-md"
                        />
                        {errors.newPassword && (
                            <p className="text-red-500 text-sm">
                                {errors.newPassword.type === "minLength"
                                    ? "New password must be at least 8 characters"
                                    : "New password is required"}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirm-password" className="block mb-2">Confirm New Password:</label>
                        <input
                            type="password"
                            id="confirm-password"
                            {...register("confirmPassword", {
                                required: {value: true, message: "Password confirmation is required"},
                                validate: (value) => value === watch("newPassword") || "Passwords do not match",
                            })}
                            className="w-full bg-zinc-700 text-white p-3 rounded-md"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 mr-2"
                        >
                            Change
                        </button>
                        <button
                            onClick={closeChangePasswordModal}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
