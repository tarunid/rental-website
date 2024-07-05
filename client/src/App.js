import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Houses from './Houses';
import Booking from './Booking';
import About from './About';
import Contact from './Contact';
import Home1 from './Home1';
import Payment from './Payment';
import Chatbot from './Chatbot';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/houses" element={<Houses />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/Chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
};

export default App;
