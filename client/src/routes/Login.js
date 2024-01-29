import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import heroImg from '../assets/hero-img.png';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import '../styles/Login.css';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            const token = user.token;
            if (!token) return;
            navigate('/tasks');
        }

    }, [navigate]);

    const handleLogin = e => {
        e.preventDefault();

        axios.post('https://task-management-server-rho-ten.vercel.app/api/user/login', { email, password })
            .then(res => {
                console.log(res);
                setError('');
                localStorage.setItem('user', JSON.stringify(res.data));
                navigate('/tasks');
                window.location.reload();
            })
            .catch(err => {
                if (err.response.data.error) {
                    setError(err.response.data.error);
                } 
            });
    }

    return (
        <div className="login">
            <form onSubmit={handleLogin}>
                <h1>Login Here</h1>
                <p style={{ color: '#ff0000' }}>{error}</p>
                <div className="input">
                    <FaEnvelope />
                    <input type="text" placeholder='Enter your email address' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="input">
                    <FaLock />
                    <input type="password" placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button>Login</button>
                <p style={{ marginTop: '7px' }}>Don't have an account? <Link to='/register'>Register</Link></p>
            </form>
            <img src={heroImg} alt="Login desc" />
        </div>
    );
}

export default Login;