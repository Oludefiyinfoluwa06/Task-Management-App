import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>Copyright &copy; {currentYear} | All Rights Reserved</footer>
    );
}

export default Footer;