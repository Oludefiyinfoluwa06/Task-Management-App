import React from 'react';
import noTask from '../assets/no-task.png';
import { Link } from 'react-router-dom';

const NoTask = () => {
    return (
        <div className='no-task'>
            <img src={noTask} alt="No task" />
            <h1>You have no tasks</h1>
            <Link to='add'>Add task</Link>
        </div>
    );
}

export default NoTask;