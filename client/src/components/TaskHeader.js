import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const TaskHeader = () => {
    const [username, setUsername] = useState('Guest');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUsername(user ? user.username : 'Guest');
    }, []);

    return (
        <div className="header">
            <h1>Welcome, {username}</h1>
            <Link to='add'><FaPlus /> Add Task</Link>
        </div>
    );
}

export default TaskHeader;