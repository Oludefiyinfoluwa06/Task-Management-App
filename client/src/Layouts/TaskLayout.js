import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import TaskHeader from '../components/TaskHeader';

const TaskLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            navigate('/login');
            return;
        }
    }, [navigate]);
    return (
        <div className='tasks'>
            <TaskHeader />
            <Outlet />
        </div>
    );
}

export default TaskLayout;