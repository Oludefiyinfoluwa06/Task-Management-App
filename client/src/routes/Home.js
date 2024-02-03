import React from 'react';
import heroImg from '../assets/hero-img.png';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className="hero">
            <div className="hero-text">
                <h1>Ofto Task Manager</h1>
                <p>
                    Welcome to Ofto Task Manager, your ultimate companion in conquering tasks and maximizing productivity! Seamlessly designed to simplify your life, Ofto Task Manager is not just a task manager; it's your personal productivity powerhouse. In the fast-paced world we live in, staying organized is the key to success.
                </p><br />
                
                <p>
                    With Ofto Task Manager, you can bid farewell to chaos and welcome a structured approach to your daily endeavors. Whether you're a busy professional, a student juggling multiple deadlines, or someone simply striving for a more organized lifestyle, our app is tailored to meet your unique needs.
                </p>
            </div>
            <img src={heroImg} alt="Hero desc" />
        </div>
    );
}

export default Home;