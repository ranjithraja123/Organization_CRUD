import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import axios from 'axios';
import Logoutcomponent from '../logoutComp/Logoutcomponent';
import { MdDelete, MdEdit } from 'react-icons/md';
import UserEditModal from '../admineditmodal/UserEditModal';
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const DataTable = () => {
  const { authUser } = useAuthContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!authUser) return;

      try {
        let response;
        if (authUser?.user?.role === 'admin') {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('No token found');
            return;
          }
          response = await axios.get('/api/users/organization/users', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
        setData(response?.data || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authUser]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      await axios.delete(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData((prevData) => prevData.filter(item => item._id !== id));
      alert('User deleted successfully');
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('Failed to delete user. Please try again.');
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    setIsModalOpen(false);
  };

  const handleView = (id) => {
    navigate(`/user/${id}`);
  };

  if (!authUser) {
    return <div>Loading user information...</div>;
  }

  if (loading) {
    return <div>Loading data...</div>;
  }

  return (
    <div className='flex flex-col items-center justify-center mx-auto' style={{ minWidth: '200px', width: '70%' }}>
      <div>
        <Logoutcomponent />
      </div>
      <div style={{ minWidth: '200px', width: '70%' }}>
        <h1
          className="flex flex-col items-center justify-center mx-auto text-4xl mb-2 italic"
          style={{
            textShadow: '0 0 3px pink, 0 0 7px pink, 0 0 10px pink, 0 0 15px pink'
          }}
        >
          {data[0]?.organization?.name || 'Organization Name'}
        </h1>
        <table
          className="w-full table min-w-150 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0"
          style={{
            boxShadow: 'inset -10px 0 10px -10px purple, inset 10px 0 10px -10px pink'
          }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <button className='px-2' onClick={() => handleView(item._id)}>
                    <FaEye fontSize={20} />
                  </button>
                  <button className='px-2' onClick={() => handleDelete(item._id)}>
                    <MdDelete fontSize={20} />
                  </button>
                  <button className='px-2' onClick={() => handleEdit(item)}>
                    <MdEdit fontSize={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <UserEditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={selectedUser}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default DataTable;
