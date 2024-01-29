import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import heroImg from '../assets/hero-img.png';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import '../styles/Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) navigate('/tasks');

    }, [navigate]);

    const handleRegister = e => {
        e.preventDefault();

        axios.post('https://task-management-server-rho-ten.vercel.app/api/user/register', { username, email, password })
            .then(res => {
                console.log(res);
                setError('');
                navigate('/login');
            })
            .catch(err => {
                if (err.response.data.error) {
                    setError(err.response.data.error);
                }
            });
    }

    return (
        <div className="register">
            <form onSubmit={handleRegister}>
                <h1>Register Here</h1>
                <p style={{ color: '#ff0000' }}>{error}</p>
                <div className="input">
                    <FaUser />
                    <input type="text" placeholder='Enter your username' value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="input">
                    <FaEnvelope />
                    <input type="text" placeholder='Enter your email address' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="input">
                    <FaLock />
                    <input type="password" placeholder='Create a password' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button>Register</button>
                <p style={{ marginTop: '7px' }}>Already have an account? <Link to='/login'>Login</Link></p>
            </form>
            <img src={heroImg} alt="Login desc" />
        </div>
    );
}

export default Register;