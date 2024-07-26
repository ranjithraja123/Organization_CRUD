import React, { useState } from 'react';
import axios from 'axios';

const EditModal = ({ isOpen, onClose, userData, onUpdate }) => {
    const [name, setName] = useState(userData.name || '');
    const [email, setEmail] = useState(userData.email || '');
    const [error, setError] = useState('');

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            await axios.put(`/api/users/${userData._id}`, { name, email }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            onUpdate({ name, email }); // Pass updated data to parent component
            onClose(); // Close the modal
        } catch (err) {
            console.error('Failed to update user:', err);
            setError('Failed to update user. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Edit User</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="flex justify-end">
                    <button onClick={handleUpdate} className="btn btn-primary mr-2">Save</button>
                    <button onClick={onClose} className="btn btn-secondary">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
