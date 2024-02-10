import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaHome, FaSignInAlt, FaSignOutAlt, FaTasks, FaUser, FaUserPlus } from 'react-icons/fa';
import logo from '../assets/logo.png';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            setIsLoggedIn(true);
        }

    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.clear();
        setIsLoggedIn(false);
        navigate('/login');
    }

    const handleShowMenu = () => {
        setToggleMenu(prev => !prev);
    }

    const handleCloseMenu = () => {
        setToggleMenu(false);
    }

    return (
        <nav>
            <div className="logo">
                <img src={logo} alt="Ofto Task Manager" />
                <label>OTM</label>
            </div>
            <div>
                <ul className={toggleMenu ? 'show' : 'hide'}>
                    <li onClick={handleCloseMenu}><Link to='/'><FaHome /> Home</Link></li>
                    { isLoggedIn ? 
                        <>
                            <li onClick={handleCloseMenu}><Link to='/tasks'><FaTasks /> Tasks</Link></li>
                            <li onClick={handleCloseMenu}><Link to='/profile'><FaUser /> Profile</Link></li>
                            <li onClick={handleLogout}><FaSignOutAlt /> Logout</li>
                        </> :
                        <>
                            <li onClick={handleCloseMenu}><Link to='/login'><FaSignInAlt /> Login</Link></li>
                            <li onClick={handleCloseMenu}><Link to='/register'><FaUserPlus /> Register</Link></li>
                        </>
                    }
                </ul>
                <div className="menu" onClick={handleShowMenu}>
                    <FaBars />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;