import React from 'react';

const AllTasks = ({ tasks }) => {
    return (
        <div className='all-tasks'>
            {tasks.map(task => (
                <div>{task.name}</div>
            ))}
        </div>
    );
}

export default AllTasks;