import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Logoutcomponent from '../logoutComp/Logoutcomponent';
import { useNavigate } from 'react-router-dom';
import EditModal from '../editmodal/EditModal';
import { useAuthContext } from '../../context/AuthContext';
import avatar from './../../assets/avatr.jpg'
const DataCard = () => {
    const navigate = useNavigate();
    const { authUser } = useAuthContext()
    const { id } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await axios.get(`/api/users/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                setData(response.data);
                console.log(response.data, 'resuser');
            } catch (error) {
                console.error('Failed to fetch data:', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const deleteUser = async () => {
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
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            alert('User deleted successfully');
            navigate('/');
        } catch (error) {
            console.error('Failed to delete user:', error);
            alert('Failed to delete user. Please try again.');
        }
    };

    const handleUpdate = (updatedData) => {
        setData((prevData) => ({
            ...prevData,
            ...updatedData
        }));
    };

    return (
        <>
            <div className='flex flex-col items-center justify-center mx-auto'
                style={{
                    boxShadow: 'inset -10px 0 10px -10px purple, inset 10px 0 10px -10px pink'
                }}>
                <div className='flex justify-end w-full p-2'>
                    <Logoutcomponent />
                </div>
                <figure>
                    <img src={avatar} className='rounded-full w-18 h-20' alt='Avatar' />
                </figure>


                <div className="card-body">
                    <h2 className="flex items-center justify-center card-title">User Details</h2>
                    <h2 className="font-bold italic">
                        Name: <span className="font-bold italic">{data?.name}</span>
                    </h2>
                    <h2 className="font-bold italic">Email: <span className="font-bold italic">{data?.email}</span></h2>
                    <h2 className="font-bold italic">Company Name: <span className="font-bold italic">{data?.organization?.name}</span></h2>
                    <h2 className="font-bold italic">Description: <span className="font-bold italic">{data?.organization?.description}</span></h2>

                    <div className='flex justify-center'>
                        <div className="card-actions justify-end">
                            <button className="btn btn-outline btn-secondary" onClick={() => setIsModalOpen(true)}>Edit</button>
                        </div>

                    </div>
                </div>
            </div>

            <EditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                userData={data}
                onUpdate={handleUpdate}
            />
        </>
    );
};

export default DataCard;
