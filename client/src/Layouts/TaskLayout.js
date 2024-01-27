import React from 'react';
import { Outlet } from 'react-router-dom';
import TaskHeader from '../components/TaskHeader';

const TaskLayout = () => {
    return (
        <div className='tasks'>
            <TaskHeader />
            <Outlet />
        </div>
    );
}

export default TaskLayout;