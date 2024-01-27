import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NoTask from '../components/NoTask';
import '../styles/Tasks.css';
import Loading from '../components/Loading';
import AllTasks from '../components/AllTasks';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    let token;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) return navigate('/login');

        token = user.token;

        return;
    }, [navigate]);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const res = await axios.get('https://task-management-server-rho-ten.vercel.app/api/tasks/all', {
                    headers: {
                        Authorization: token,
                    }
                });

                const userTasks = res.data.tasks;
                setTasks(userTasks);
                setIsLoading(false);

            } catch (error) {
                if (error.response.data.error === 'User is not authorized and no token, try logging in') {
                    navigate('/login');
                }
            }
        }

        getTasks();

    }, [token]);
    
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : tasks.length > 0 ? (
                <AllTasks tasks={tasks} />
            ) : (
                <NoTask />
            )}
        </>
    );
}

export default Tasks;