import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddTask = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setdueDate] = useState('');
    const [priorityLevel, setPriorityLevel] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) navigate('/login');

    const token = user.token;

    const handleAddTask = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('https://task-management-server-rho-ten.vercel.app/api/tasks/add',
                { name, description, dueDate, priorityLevel },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            if (res.data.message) {
                setError('');
                navigate('/tasks');
            }

        } catch (err) {
            if (err.response.data.error === "User is not authorized, try logging in again" || err.response.data.error === "User is not authorized and no token, try logging in") {
                localStorage.removeItem('user');
                localStorage.clear();
                navigate('/login');
            } else {
                setError('An error occurred while adding the task.');
            }
        }
    };



    return (
        <form onSubmit={handleAddTask} className='add-task'>
            <h1>Add Task</h1>
            <p style={{ color: '#ff0000' }}>{error}</p>
            <div className="input">
                <label>Title</label>
                <input type="text" placeholder='Enter the task title' value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="input">
                <label>Description</label>
                <input type="text" placeholder='Describe your task' value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="input">
                <label>Due date</label>
                <input type="date" value={dueDate} onChange={e => setdueDate(e.target.value)} />
            </div>
            <div className="input">
                <label>Priority Level</label>
                <input type="text" placeholder='Specify a priority level for this task' value={priorityLevel} onChange={e => setPriorityLevel(e.target.value)} />
                <small>Your value must be either of low, medium or high</small>
            </div>
            <button>Add Task</button>
        </form>
    );
}

export default AddTask;