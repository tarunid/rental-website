import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';

const Home = () => {
    const aboutRef = useRef(null);
    const contactRef = useRef(null);

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
                            <li><Link to="/" >Home</Link></li>
                            <li><Link to="/signup" >Houses</Link></li>
                            <li><Link to="/signup" >Booking</Link></li>
                            <li><Link to="#about" onClick={scrollToAbout}>About</Link></li>
                            <li><Link to="#contact" onClick={scrollToContact}>Contact</Link></li>
                            <li ><Link to="/signup" style={{ 
                                color: 'white', textAlign:'center', backgroundColor:'blue',padding:'5px',
                                borderRadius:'3px', margin:'10px'
                            }} >Login/Signup</Link></li>
                        </ul>
                    </nav>
                </header>
                <div className="home-content">
                    <h1>Welcome to Our House Rental Website</h1>
                    <p>Explore our beautiful houses for rent!</p>
                </div>
            </div>
            
            <div ref={aboutRef}>
                <About />
            </div>
            <div ref={contactRef}>
                <Contact />
            </div>
            <Link to="/chatbot" className="chatbot-button">
            💬
            </Link>
            <Footer />

            {/* Chatbot component */}
            
        </div>
    );
};

export default Home;
