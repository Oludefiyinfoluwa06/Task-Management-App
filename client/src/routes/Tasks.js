import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NoTask from '../components/NoTask';
import Loading from '../components/Loading';
import AllTasks from '../components/AllTasks';
import '../styles/Tasks.css';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) navigate('/login');

    const token = user.token;

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
                if (error.response.data.error === "User is not authorized, try logging in again" || error.response.data.error === "User is not authorized and no token, try logging in") {
                    localStorage.removeItem('user');
                    localStorage.clear();
                    navigate('/login');
                } else {
                    setIsLoading(true);
                }
            }
        }

        getTasks();

    }, [token, navigate]);
    
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