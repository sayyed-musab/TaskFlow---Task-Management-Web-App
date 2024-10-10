"use client";

import { useForm } from "react-hook-form";

export default function DeleteAccountModal({
    closeDeleteAccountModal,
    handleAccountDeletion,
}) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        handleAccountDeletion(data.deletePassword);  // Pass password to deletion handler
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-zinc-800 rounded-lg p-6 shadow-lg w-96">
                <h2 className="text-2xl font-semibold mb-4">Delete Account</h2>
                <p className="mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Password Field */}
                    <div className="mb-4">
                        <label htmlFor="delete-password" className="block mb-2">Password:</label>
                        <input
                            type="password"
                            id="delete-password"
                            {...register("deletePassword", { required: "Password is required" })}
                            className="w-full bg-zinc-700 text-white p-3 rounded-md"
                        />
                        {errors.deletePassword && (
                            <p className="text-red-500 text-sm">{errors.deletePassword.message}</p>
                        )}
                    </div>

                    {/* Confirmation Checkbox */}
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="delete-confirmation"
                            {...register("deleteConfirmation", { required: "You must confirm this action" })}
                            className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        <label htmlFor="delete-confirmation" className="ml-2">
                            I understand that this action is irreversible.
                        </label>
                    </div>
                    {errors.deleteConfirmation && (
                        <p className="text-red-500 text-sm mb-4">{errors.deleteConfirmation.message}</p>
                    )}

                    {/* Buttons */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 mr-2"
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            onClick={closeDeleteAccountModal}
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
