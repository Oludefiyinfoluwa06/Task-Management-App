import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaSignOutAlt, FaTasks, FaUser, FaUserPlus } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            setIsLoggedIn(true);
        }

        window.location.reload();

    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.clear();
        setIsLoggedIn(false);
        navigate('/login');
    }

    return (
        <nav>
            <label>Task Manager</label>
            <ul>
                <li><Link to='/'><FaHome /> Home</Link></li>
                { isLoggedIn ? 
                    <>
                        <li><Link to='/tasks'><FaTasks /> Tasks</Link></li>
                        <li><Link to='/profile'><FaUser /> Profile</Link></li>
                        <li onClick={handleLogout}><FaSignOutAlt /> Logout</li>
                    </> :
                    <>
                        <li><Link to='/login'><FaSignInAlt /> Login</Link></li>
                        <li><Link to='/register'><FaUserPlus /> Register</Link></li>
                    </>
                }
            </ul>
        </nav>
    );
}

export default Navbar;