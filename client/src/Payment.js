import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const PaymentPage = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  return (
    <div className='pay'>
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
        <h1>Welcome to Payment</h1>
        <div className="payment-container">
        <div className="top-bar" style={{ width: `${(step / 3) * 100}%` }}></div>
        <div className="payment-steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>Step 1: Basic Information</div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>Step 2: Payment Details</div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>Step 3: Confirmation</div>
        </div>
        <div className="payment-content">
            {step === 1 && (
            <div>
                <h2>Basic Information</h2>
                <p>Please provide your basic details.</p>
                <form>
                {/* Billing information form fields */}
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                {/* Add more fields as needed */}
                <button onClick={handleNextStep}>Next</button>
                </form>
            </div>
            )}
            {step === 2 && (
            <div>
                <h2>Payment Details</h2>
                <p>Please enter your payment details.</p>
                <form>
                {/* Payment details form fields */}
                <label htmlFor="cardNumber">Card Number:</label>
                <input type="text" id="cardNumber" name="cardNumber" required />
                <label htmlFor="expiry">Expiry Date:</label>
                <input type="text" id="expiry" name="expiry" required />
                {/* Add more fields as needed */}
                <button onClick={handleNextStep}>Next</button>
                </form>
            </div>
            )}
            {step === 3 && (
            <div>
                <h2>Confirmation</h2>
                <p>Please review your booking details before confirming.</p>
                <div>
                {/* Display booking details for confirmation */}
                <p>House: XYZ House</p>
                <p>Check-in: 2024-06-01</p>
                <p>Check-out: 2024-06-10</p>
                {/* Add more details as needed */}
                </div>
                <button>Confirm Booking</button>
            </div>
            )}
        </div>
        </div>
        <Footer />
    </div>
  );
};

export default PaymentPage;
