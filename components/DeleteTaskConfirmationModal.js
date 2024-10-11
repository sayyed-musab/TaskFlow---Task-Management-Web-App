"use client";

export default function DeleteConfirmationModal({ closeDeleteModal, handleDeleteTask }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-zinc-800 rounded-lg p-6 shadow-lg w-96">
                <h2 className="text-2xl font-semibold mb-4">Delete Task</h2>
                <p className="mb-4">Are you sure you want to delete this task? This action cannot be undone.</p>
                <div className="flex justify-end">
                    <button
                        onClick={handleDeleteTask}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 mr-2"
                    >
                        Delete
                    </button>
                    <button
                        onClick={closeDeleteModal}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
