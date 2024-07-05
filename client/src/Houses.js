// Houses.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShare, FaMapMarkerAlt } from 'react-icons/fa';
const housesData = [
    { id: 1, imgSrc: 'image1.jpg', name: 'Sunset Villa', location: 'California', type: '3BHK', price: '$2500/month' },
    { id: 2, imgSrc: 'image3.jpg', name: 'Ocean View', location: 'Florida', type: '2BHK', price: '$1800/month' },
    { id: 3, imgSrc: 'image2.jpg', name: 'Mountain Retreat', location: 'Colorado', type: '4BHK', price: '$3000/month' },
    { id: 4, imgSrc: 'image4.jpg', name: 'City Lights', location: 'New York', type: '2BHK', price: '$3500/month' },
    { id: 5, imgSrc: 'image5.jpg', name: 'Garden House', location: 'Oregon', type: '3BHK', price: '$2200/month' },
    { id: 6, imgSrc: 'image6.jpg', name: 'Lakeside Cottage', location: 'Michigan', type: '2BHK', price: '$1600/month' },
    { id: 7, imgSrc: 'image7.jpg', name: 'Urban Loft', location: 'Texas', type: '1BHK', price: '$1200/month' },
    { id: 8, imgSrc: 'image8.jpg', name: 'Riverside Bungalow', location: 'Washington', type: '4BHK', price: '$2800/month' },
    { id: 9, imgSrc: 'image9.jpg', name: 'Suburban Home', location: 'Illinois', type: '3BHK', price: '$2000/month' },
];
const Houses = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const housesPerPage = 3;
    const indexOfLastHouse = currentPage * housesPerPage;
    const indexOfFirstHouse = indexOfLastHouse - housesPerPage;
    const currentHouses = housesData.slice(indexOfFirstHouse, indexOfLastHouse);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(housesData.length / housesPerPage); i++) {
        pageNumbers.push(i);
    }
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div className="houses-container">
            <h1 className="houses-heading">Houses</h1>
            <div className="houses-grid">
                {currentHouses.map((house) => (
                    <div className="house" key={house.id}>
                        <img src={house.imgSrc} alt={`House ${house.id}`} />
                        <div className="info">
                            <p className='name'>{house.name}</p>
                            <p><FaMapMarkerAlt /> {house.location} <span role="img" aria-label="Location Symbol"></span></p>
                            <hr />
                            <p>{house.type}</p>
                            <p>{house.price}</p>
                            <div className="actions">
                                <button className="book-button"><Link to="/booking">Book</Link></button>
                                <div className="icons">
                                    <FaHeart className="like-icon" />
                                    <FaShare className="share-icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => paginate(number)} className="page-link">
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
};
export default Houses;
