import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: '',
        address: '',
        payment: 'online',
        terms: false
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};
        const nameRegex = /^[A-Za-z\s]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[1-9][0-9]{9}$/;

        if (!nameRegex.test(formData.name)) {
            errors.name = 'Name should not contain any numbers';
        }
        if (!emailRegex.test(formData.email)) {
            errors.email = 'Invalid email format';
        }
        if (!phoneRegex.test(formData.phone)) {
            errors.phone = 'Phone number must be 10 digits and not start with 0';
        }
        const today = new Date().toISOString().split('T')[0];
        if (formData.checkIn <= today) {
            errors.checkIn = 'Check-in date should be after today';
        }
        if (formData.checkOut <= formData.checkIn) {
            errors.checkOut = 'Check-out date should be after check-in date';
        }
        if (isNaN(formData.guests) || formData.guests < 1) {
            errors.guests = 'Number of guests should be a valid number greater than 0';
        }
        if (!formData.terms) {
            errors.terms = 'You must agree to the terms and conditions';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        try {
            const response = await fetch('https://rental-website-e57q.onrender.com/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                alert('Booking successful');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    checkIn: '',
                    checkOut: '',
                    guests: '',
                    address: '',
                    payment: 'online',
                    terms: false
                });
            } else {
                console.error(data.error);
                alert('Booking failed: ' + data.error);
            }
        } catch (error) {
            console.error('There was an error submitting the form!', error);
            alert('There was an error submitting the form!');
        }
    };

    return (
        <div className='book'>
            <header className="header">
                <div className="logo">
                <img src="logo.jpg" alt="Logo" />
                </div>
                <nav>
                <ul className="nav-links">
                    <li><Link to="/home" >Home</Link></li>
                    <li><Link to="/home">Houses</Link></li>
                    <li><Link to="/booking">Booking</Link></li>
                    <li><Link to="/payment">Payment</Link></li>
                    <li><Link to="/home" >About Us</Link></li>
                    <li><Link to="/home" >Contact Us</Link></li>
                </ul>
                </nav>
            </header>
            <h1>Booking</h1>
            <div className="booking-container">
                <p>Book your stay with us!</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    {errors.name && <span className="error">{errors.name}</span>}

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    {errors.email && <span className="error">{errors.email}</span>}

                    <label htmlFor="phone">Phone Number:</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                    {errors.phone && <span className="error">{errors.phone}</span>}

                    <label htmlFor="checkIn">Check-in Date:</label>
                    <input type="date" id="checkIn" name="checkIn" value={formData.checkIn} onChange={handleChange} required />
                    {errors.checkIn && <span className="error">{errors.checkIn}</span>}

                    <label htmlFor="checkOut">Check-out Date:</label>
                    <input type="date" id="checkOut" name="checkOut" value={formData.checkOut} onChange={handleChange} required />
                    {errors.checkOut && <span className="error">{errors.checkOut}</span>}

                    <label htmlFor="guests">Number of Guests:</label>
                    <input type="number" id="guests" name="guests" value={formData.guests} onChange={handleChange} min="1" required />
                    {errors.guests && <span className="error">{errors.guests}</span>}

                    <label htmlFor="address">Address:</label>
                    <textarea id="address" name="address" value={formData.address} onChange={handleChange} rows="3" required></textarea>

                    <label htmlFor="payment">Payment Method:</label>
                    <select id="payment" name="payment" value={formData.payment} onChange={handleChange}>
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                    </select>

                    <input type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={handleChange} required />
                    <label htmlFor="terms">Terms and Conditions</label>
                    {errors.terms && <span className="error">{errors.terms}</span>}

                    <input type="submit" value="Submit" />
                    <p>if Online Payment do Payment by clicking <Link to="/payment">Do Pay</Link></p>
                </form>
            </div>
            <br />
            <Footer />
        </div>
    );
};

export default BookingForm;
