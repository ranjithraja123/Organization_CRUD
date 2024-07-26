import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserEditModal = ({ isOpen, onClose, user, onUpdate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      await axios.put(`/api/users/${user._id}`, { name, email, role }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onUpdate(); // Notify parent to refresh data
      onClose(); // Close the modal
      alert('User updated successfully');
      window.location.reload();

    } catch (error) {
      console.error('Failed to update user:', error);
      alert('Failed to update user. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
      <div className='bg-white p-4 rounded-lg shadow-lg'>
        <h2 className='text-xl mb-4'>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>Name</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='border rounded-lg px-3 py-2 w-full'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border rounded-lg px-3 py-2 w-full'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>Role</label>
            <input
              type='text'
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className='border rounded-lg px-3 py-2 w-full'
              required
            />
          </div>
          <div className='flex justify-end'>
            <button type='button' onClick={onClose} className='bg-gray-300 px-4 py-2 rounded mr-2'>Cancel</button>
            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditModal;
