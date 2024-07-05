import React, { useState } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://rental-website-e57q.onrender.com/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('Message sent successfully!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                });
            } else {
                setStatus('Failed to send message. Please try again.');
            }
        } catch (error) {
            setStatus('An error occurred. Please try again.');
        }
    };

    return (
        <div className='contact'> 
            <h1 style={{ color: 'black', textAlign:'center'}}>Contact Us</h1>
            <div className="contact-us">
                <div className="contact-info">
                    <h2>Contact Information</h2>
                    <p>Contact us for any inquiries or feedback.</p>
                    <div className="info-item">
                        <span className="icon"><FaMapMarkerAlt /><b>Address</b></span>
                        <p>123 Street Name, City, Country</p>
                    </div>
                    <div className="info-item">
                        <span className="icon"><FaEnvelope /><b> E-Mail</b></span>
                        <p>info@example.com</p>
                    </div>
                    <div className="info-item">
                        <span className="icon"><FaPhone /><b> Phone Number</b></span>
                        <p>+1234567890</p>
                    </div>
                </div>
                <div className="contact-form">
                    <h2>Send us a message</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </label>
                        <label>
                            Email:
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </label>
                        <label>
                            Phone Number:
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                        </label>
                        <label>
                            Your Message:
                            <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                    {status && <p>{status}</p>}
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
