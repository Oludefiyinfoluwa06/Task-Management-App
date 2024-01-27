import React, { useState } from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import { FaCalendar, FaPencilAlt, FaTrash } from 'react-icons/fa';

const AllTasks = ({ tasks }) => {
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const formatDate = (dueDate) => {
        const options = {
            year: 'numeric',
            day: 'numeric',
            month: 'long'
        }

        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(dueDate));
        return formattedDate;
    }

    const handleShowMenu = (taskId) => {
        setSelectedTaskId(prevSelectedTaskId => prevSelectedTaskId === taskId ? null : taskId);
    }

    const handleUpdateTask = () => {

    }
    const handleDeleteTask = () => {

    }

    return (
        <div className='all-tasks'>
            {tasks.map(task => (
                <div key={task._id} className='task'>
                    <div className="task-header">
                        <p>
                            {task.priorityLevel === "High" ? (
                                <div className='high'></div>
                            ) : task.priorityLevel === "Medium" ? (
                                <div className='medium'></div>
                            ) : task.priorityLevel === "Low" ? (
                                <div className='low'></div>
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
                        <div className="menu-item" onClick={handleUpdateTask}>
                            <FaPencilAlt />
                            <p>Edit task</p>
                        </div>
                        <div className="menu-item" onClick={handleDeleteTask}>
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