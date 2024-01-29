import React from 'react';

const User = ({ profile }) => {
    return (
        <div className='profile'>
            {profile.username}
        </div>
    );
}

export default User;