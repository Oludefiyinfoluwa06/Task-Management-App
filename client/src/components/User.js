import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import profilePic from '../assets/profile-pic.png';

const User = ({ profile }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        navigate('/login');
        return;
    }

    const token = user.token;

    const handleDeleteProfile = async userId => {
        await axios.delete(`https://task-management-server-rho-ten.vercel.app/api/user/me/delete/${userId}`, {
            headers: {
                Authorization: token,
            },
        })
            .then(res => {
                if (res.data.message) {
                    localStorage.removeItem('user');
                    localStorage.clear();
                    navigate('/');
                    window.location.reload();
                    return;
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className='profile'>
            <div className="profile-pic">
                <img src={profilePic} alt="User Profile" />
                <div className="pic-edit">
                    <FaPen />
                </div>
            </div>
            <div className="info">
                <div className="profile-info">
                    <p><b>Username</b>: {profile.username}</p>
                    <p><b>Email</b>: {profile.email}</p>
                </div>
                <div className="profile-actions">
                    <Link to={`edit-profile/${profile.id}`} className="action">Edit profile</Link>
                    <div className="action" onClick={() => handleDeleteProfile(profile.id)}>Delete profile</div>
                </div>
            </div>
        </div>
    );
}

export default User;