import React from 'react';
import { FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import profilePic from '../assets/profile-pic.png';

const User = ({ profile }) => {
    const handleDeleteProfile = () => {

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
                    <div className="action" onClick={handleDeleteProfile}>Delete profile</div>
                </div>
            </div>
        </div>
    );
}

export default User;