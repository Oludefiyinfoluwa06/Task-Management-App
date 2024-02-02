import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEnvelope, FaUser } from 'react-icons/fa';
import Loading from '../components/Loading';
import axios from 'axios';

const EditProfile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();
    const navigate = useNavigate();
    
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) navigate('/login');
    
    const token = user.token;

    useEffect(() => {
        axios.get('https://task-management-server-rho-ten.vercel.app/api/user/me', {
            headers: {
                Authorization: token
            }
        })
            .then(res => {
                const me = res.data.user;
                setUsername(me.username);
                setEmail(me.email);
                setIsLoading(false);
            })
            .catch(error => {
                if (error.response.data.error === "User is not authorized, try logging in again" || error.response.data.error === "User is not authorized and no token, try logging in") {
                    localStorage.removeItem('user');
                    localStorage.clear();
                    navigate('/login');
                } else {
                    setError('An error occurred while getting user detail.');
                }
            });
    }, [token, navigate]);

    const handleEditProfile = async e => {
        e.preventDefault();

        await axios.put(`https://task-management-server-rho-ten.vercel.app/api/user/me/edit/${id}`,
            { username, email },
            {
            headers: {
                Authorization: token,
            },
        })
            .then(res => {
                if (res.data.message) {
                    navigate('/profile');
                    return;
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            {
                isLoading ? 
                    <Loading /> :
                <div className='edit-profile'>
                    <form onSubmit={handleEditProfile}>
                        <h1>Edit Profile</h1>
                        <p style={{ color: '#ff0000' }}>{error}</p>
                        <div className="input">
                            <FaUser />
                            <input type="text" placeholder='Enter your username' value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className="input">
                            <FaEnvelope />
                            <input type="text" placeholder='Enter your email address' value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <button>Edit</button>
                    </form>
                </div>
            }
        </>
    );
}

export default EditProfile;