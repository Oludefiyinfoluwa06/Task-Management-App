import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateTask = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setdueDate] = useState('');
    const [priorityLevel, setPriorityLevel] = useState('');
    const [error, setError] = useState('');
    
    const { id } = useParams();
    const navigate = useNavigate();
    
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
        navigate('/login');
    }
    
    const token = user.token;

    useEffect(() => {
        axios.get(`https://task-management-server-rho-ten.vercel.app/api/tasks/${id}`, {
            headers: {
                Authorization: token,
            }
        })
            .then(res => {
                const convertDateFormat = (inputDate) => {
                    const dateObject = new Date(inputDate);
                    
                    const year = dateObject.getFullYear();
                    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
                    const day = String(dateObject.getDate()).padStart(2, '0');
    
                    return `${year}-${month}-${day}`;
                };
                if (res) {
                    setName(res.data.task.name);
                    setDescription(res.data.task.description);
                    setdueDate(convertDateFormat(res.data.task.dueDate));
                    setPriorityLevel(res.data.task.priorityLevel);
                }
            })
            .catch(error => {
                if (error.response.data.error === "User is not authorized, try logging in again" || error.response.data.error === "User is not authorized and no token, try logging in") {
                    localStorage.removeItem('user');
                    localStorage.clear();
                    navigate('/login');
                } else {
                    setError('An error occurred while getting the task detail.');
                }
            });
    }, [id, token, navigate]);

    const handleUpdateTask = async (e, id) => {
        e.preventDefault();
        try {
            const res = await axios.put(`https://task-management-server-rho-ten.vercel.app/api/tasks/update/${id}`,
                { name, description, dueDate, priorityLevel },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            if (res) {
                setError('');
                navigate('/tasks');
            }

        } catch (err) {
            if (err.response) {
                setError(err.response.data.error);
            } else {
                setError('An error occurred while updating the task.');
            }
        }
    };

    return (
        <form onSubmit={e => handleUpdateTask(e, id)} className='update-task'>
            <h1>Update Task</h1>
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
            <button>Update Task</button>
        </form>
    );
}

export default UpdateTask;