import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiMenuKebab } from 'react-icons/ci';
import { FaCalendar, FaPencilAlt, FaTrash } from 'react-icons/fa';

const AllTasks = ({ tasks }) => {
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        navigate('/login');
        return;
    }

    const token = user.token;

    const formatDate = (dueDate) => {
        const options = {
            year: 'numeric',
            day: 'numeric',
            month: 'long'
        }

        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(dueDate));
        return formattedDate;
    }

    const handleShowMenu = taskId => {
        setSelectedTaskId(prevSelectedTaskId => prevSelectedTaskId === taskId ? null : taskId);
    }

    const handleUpdateTask = (taskId) => navigate(`update/${taskId}`);

    const handleDeleteTask = async taskId => {
        await axios.delete(`https://task-management-server-rho-ten.vercel.app/api/tasks/delete/${taskId}`, {
            headers: {
                Authorization: token,
            },
        })
            .then(res => {
                if (res.data.message === "Task deleted successfully") {
                    window.location.reload();
                    return;
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className='all-tasks'>
            {tasks.map(task => (
                <div key={task._id} className='task'>
                    <div className="task-header">
                        <p>
                            {task.priorityLevel === "High" ? (
                                <span className='high'></span>
                            ) : task.priorityLevel === "Medium" ? (
                                <span className='medium'></span>
                            ) : task.priorityLevel === "Low" ? (
                                <span className='low'></span>
                            ) : <></>} {task.name}
                        </p>
                        <div className="task-menu" onClick={() => handleShowMenu(task._id)}>
                            <CiMenuKebab />
                        </div>
                    </div>
                    <p>{task.description}</p>
                    <hr />
                    <div className="task-footer">
                        <FaCalendar />
                        <p>Due on {formatDate(task.dueDate)}</p>
                    </div>
                    <div className={selectedTaskId === task._id ? "menu" : "hide"}>
                        <div className="menu-item" onClick={() => handleUpdateTask(task._id)}>
                            <FaPencilAlt />
                            <p>Edit task</p>
                        </div>
                        <div className="menu-item" onClick={() => handleDeleteTask(task._id)}>
                            <FaTrash />
                            <p>Delete Task</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AllTasks;