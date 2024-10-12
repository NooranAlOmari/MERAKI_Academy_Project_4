import React from 'react';
import Category from '../Category/Category';
import './Home.css';

function Home() {
  return (
    <>
      <header className="home-header">

        <video autoPlay muted loop className="header-background">
          <source src="/home-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="header-content">
          <h1>What will you cook today?</h1>
          <div className="search-bar">
              <input id="searchInput" placeholder="Search for a recipe..." />
              <button id="searchButton">Search</button>
          </div>
        </div>
      </header>

      <Category />
    </>
  );
}

export default Home;
