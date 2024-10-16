"use client";

export default function AccountSettings({ name, openDeleteAccountModal }) {
    return (
        <div className="bg-zinc-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>

            <div className="mb-4">
                <label className="block mb-2">Name:</label>
                <p className="bg-zinc-700 text-white p-3 rounded-md">{name}</p>
            </div>

            <button
                onClick={openDeleteAccountModal}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                aria-label="Delete Account"
            >
                Delete Account
            </button>
        </div >
    );
}
