import React from 'react';
import { Link } from 'react-router-dom';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import Footer from './Footer';

const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#007bff',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#007bff',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
};

const steps = [
    {
        id: '1',
        message: 'Welcome to the House Rental App! How can I assist you today?',
        trigger: 'options',
    },
    {
        id: 'options',
        options: [
            { value: 'findHouse', label: 'Find a House', trigger: 'findHouse' },
            { value: 'contactSupport', label: 'Contact Support', trigger: 'contactSupport' },
            { value: 'pricing', label: 'Pricing Information', trigger: 'pricing' },
            { value: 'availability', label: 'Check Availability', trigger: 'availability' },
        ],
    },
    {
        id: 'findHouse',
        message: 'Sure, I can help you find a house. Please provide your preferences.',
        trigger: 'housePreferences',
    },
    {
        id: 'housePreferences',
        message: 'What type of house are you looking for?',
        trigger: 'houseType',
    },
    {
        id: 'houseType',
        options: [
            { value: '1BHK', label: '1BHK', trigger: 'location' },
            { value: '2BHK', label: '2BHK', trigger: 'location' },
            { value: '3BHK', label: '3BHK', trigger: 'location' },
        ],
    },
    {
        id: 'location',
        message: 'Which location are you interested in?',
        trigger: 'confirmLocation',
    },
    {
        id: 'confirmLocation',
        user: true,
        trigger: 'budget',
    },
    {
        id: 'budget',
        message: 'What is your budget?',
        trigger: 'confirmBudget',
    },
    {
        id: 'confirmBudget',
        user: true,
        trigger: 'findHouseResult',
    },
    {
        id: 'findHouseResult',
        message: 'Great! We have found several houses matching your preferences. Our agent will contact you shortly.',
        end: true,
    },
    {
        id: 'contactSupport',
        message: 'You can reach our support at support@houserental.com or call us at 123-456-7890.',
        end: true,
    },
    {
        id: 'pricing',
        message: 'Our pricing varies based on the type of house and location. Would you like to know more about a specific type of house?',
        trigger: 'pricingOptions',
    },
    {
        id: 'pricingOptions',
        options: [
            { value: '1BHK', label: '1BHK', trigger: '1BHKPricing' },
            { value: '2BHK', label: '2BHK', trigger: '2BHKPricing' },
            { value: '3BHK', label: '3BHK', trigger: '3BHKPricing' },
        ],
    },
    {
        id: '1BHKPricing',
        message: 'The price for a 1BHK house starts at $800/month.',
        end: true,
    },
    {
        id: '2BHKPricing',
        message: 'The price for a 2BHK house starts at $1000/month.',
        end: true,
    },
    {
        id: '3BHKPricing',
        message: 'The price for a 3BHK house starts at $1200/month.',
        end: true,
    },
    {
        id: 'availability',
        message: 'Please provide the location and type of house you are interested in to check availability.',
        trigger: 'availabilityDetails',
    },
    {
        id: 'availabilityDetails',
        user: true,
        trigger: 'availabilityResult',
    },
    {
        id: 'availabilityResult',
        message: 'We have several houses available in your desired location. An agent will contact you soon with more details.',
        end: true,
    },
];

const Chatbot = () => {
    return (
        <div className='chatbot' style={{ backgroundImage: 'url("img.jpg")' }}>
            <header className='header'>
                <div className="logo">
                    <img src="logo.jpg" alt="Logo" />
                </div>
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/" >Home</Link></li>
                        <li><Link to="/houses" >Houses</Link></li>
                        <li><Link to="/booking" >Booking</Link></li>
                        <li><Link to="/about" >About</Link></li>
                        <li><Link to="/contact" >Contact</Link></li>
                        <li><Link to="/signup" className="login-signup-link" 
                        style={{backgroundColor:'blue', borderRadius:'5px',padding:'5px'}}>Login/Signup</Link></li>
                    </ul>
                </nav>
            </header>
            <div className='smallchatbot'>
                <ThemeProvider theme={theme}>
                    <ChatBot steps={steps} />
                </ThemeProvider>
            </div>
            <Footer />
        </div>
    );
};

export default Chatbot;
