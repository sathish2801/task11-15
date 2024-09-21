import React, { useState, useEffect } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // Add custom CSS for sticky header and layout

const App = () => {
  // Lightbox state
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Image list for Lightbox
  const images = [
    'https://deih43ym53wif.cloudfront.net/cola-beach-goa-india-shutterstock_772145203_82b97bd9df.jpeg',
    'https://www.travelanddestinations.com/wp-content/uploads/2019/04/Morocco-Desert-600x400.jpg',
    'https://e1.pxfuel.com/desktop-wallpaper/253/300/desktop-wallpaper-hills-hill-top.jpg',
    'http://s4.scoopwhoop.com/ada/assorted/hb.jpg',
  ];

  // Search filter state
  const [searchTerm, setSearchTerm] = useState('');

  const items = ['Beach', 'Dessert', 'Hills Top','boat House'];

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Notification system
  const notify = () => toast("Notification!");

  // Countdown Timer
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="App">
      {/* Sticky Header */}
      <header className="sticky-header">
        <h1>Trip up</h1>
      </header>

      {/* Search Filter */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search items..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul>
          {filteredItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Lightbox Gallery */}
      <div className="gallery">
        <h2>Make your Day</h2>
        <div className="gallery-items">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Gallery ${index}`}
              onClick={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
              style={{ cursor: 'pointer', width: '150px', margin: '10px' }}
            />
          ))}
        </div>
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % images.length)
            }
          />
        )}
      </div>

      {/* Notification System */}
      <div className="notification-container">
        <button onClick={notify}>Explore More</button>
        <ToastContainer />
      </div>

      {/* Countdown Timer */}
      <div className="countdown-container">
        <h2>50% offer for your Trip</h2>
        <p>Time remaining: 01:25: {timer} Hours</p>
      </div>
    </div>
  );
};

export default App;
