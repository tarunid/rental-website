import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Houses from './Houses';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';

const Home = () => {
  
  const housesRef = useRef(null);
  // const bookingRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const handleScroll = () => {
    // You can remove the currentScrollPos assignment since it's not used
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // const scrollToHome = () => {
  //   homeRef.current.scrollIntoView({ behavior: 'smooth' });
  // };

  const scrollToHouses = () => {
    housesRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // const scrollToBooking = () => {
  //   bookingRef.current.scrollIntoView({ behavior: 'smooth' });
  // };

  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
        <div className="home-container" style={{ backgroundImage: 'url("img1.avif")' }}>
            <header className="header">
                <div className="logo">
                <img src="logo.jpg" alt="Logo" />
                </div>
                <nav>
                <ul className="nav-links">
                    <li><Link to="#" >Home</Link></li>
                    <li><Link to="#" onClick={scrollToHouses}>Houses</Link></li>
                    <li><Link to="/booking">Booking</Link></li>
                    <li><Link to="/payment">Payment</Link></li>
                    <li><Link to="#" onClick={scrollToAbout}>About Us</Link></li>
                    <li><Link to="#" onClick={scrollToContact}>Contact Us</Link></li>
                </ul>
                </nav>
            </header>
            <div className="home-content">
                <h1>Welcome to Our House Rental Website</h1>
                <p>Explore our beautiful houses for rent!</p>
            </div>
        </div>
        
      <div ref={housesRef}>
        <Houses />
      </div>
      {/* <div ref={bookingRef}>
        <Booking />
      </div> */}
      <div ref={aboutRef}>
        <About />
      </div>
      <div ref={contactRef}>
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
