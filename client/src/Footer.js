import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>About Us</h4>
                    <p>We provide the best house rental options tailored to your needs. Our mission is to help you find your perfect home.</p>
                </div>
                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>Email: support@houserental.com</p>
                    <p>Phone: (123) 456-7890</p>
                    <p>Address: 123 Main Street, City, Country</p>
                </div>
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <p>
                        <a href="#fb">Facebook</a> <br /> 
                        <a href="#twit">Twitter</a>  <br /> 
                        <a href="#ins">Instagram</a>
                    </p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 House Rental System. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
