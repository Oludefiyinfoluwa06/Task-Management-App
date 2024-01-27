import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Tasks.css';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;

    useEffect(() => {
        const getTasks = async () => {
            try {
                const res = await axios.get('https://task-management-server-rho-ten.vercel.app/api/tasks/all', {
                    headers: {
                        Authorization: token,
                    }
                });

                setTasks(res.data.tasks);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }

        getTasks();

    }, [token]);
    
    return (
        <div className="all-tasks">
            <h1>All tasks</h1>
            {tasks.map(task => (
                <div>
                    {task}
                </div>
            ))}
        </div>
    );
}

export default Tasks;