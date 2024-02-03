import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { FaPen, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import profilePic from '../assets/profile-pic.png';

const User = ({ profile }) => {
    // const [toggleModal, setToggleModal] = useState(false);
    // const [userProfile, setUserProfile] = useState(null);
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

    // const handleToggleModal = () => {
    //     setToggleModal(!toggleModal);
    // }

    // const handleCloseModal = () => {
    //     setToggleModal(false);
    // }

    // const handleUploadPic = async e => {
    //     e.preventDefault();

    //     const formData = new FormData();
    //     formData.append('userProfile', userProfile);

    //     try {
    //         const res = await axios.post('https://localhost:5000/api/profile/upload', formData,
    //             {
    //                 headers: {
    //                     Authorization: token
    //                 }
    //             });
    //         console.log(res);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return (
        <div className='profile'>
            <div className="profile-pic">
                <img src={profilePic} alt="User Profile" />
                {/* <div className="pic-edit" onClick={handleToggleModal}>
                    <FaPen />
                </div> */}
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
            {/* <div className={toggleModal ? "modal show-modal" : "modal hide-modal"}>
                <div className="closeModal" onClick={handleCloseModal}>
                    <FaTimes />
                </div>
                <form onSubmit={handleUploadPic}>
                    <input type="file" name="userProfile" id="userProfile" onChange={e => setUserProfile(e.target.files[0])} />
                    <button>Upload</button>
                </form>
            </div> */}
        </div>
    );
}

export default User;