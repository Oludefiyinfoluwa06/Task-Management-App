import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import User from '../components/User';

const Profile = () => {
    const [profile, setProfile] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    let token;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) navigate('/login');

        token = user.token;

    }, [navigate]);

    useEffect(() => {
        const userProfile = async () => {
            try {
                const res = await axios.get('https://task-management-server-rho-ten.vercel.app/api/user/me', {
                    headers: {
                        Authorization: token,
                    }
                });

                const me = res.data.user;
                setProfile(me);
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

        userProfile();

    }, [token]);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <User profile={profile} />
            )}
        </>
    );
}

export default Profile;