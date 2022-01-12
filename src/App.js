import React, { useState, useEffect } from 'react';

import Data from './data/content.json';

const App = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filters, setFilters] = useState([]);

  const movies = Data.movies;

  useEffect(() => {
    let genres = [];

    for (let i = 0; i < movies.length; i ++) {
      genres.push(movies[i].genre);
    }

    setFilters([...new Set(genres.flat())]);
  }, [setActiveFilter]);

  const onChange = e => {
    setActiveFilter(e.target.value)
  }

  return (
    <div className="app">
      <div className="filtering">
        <form>
          <select name="genre" id="genre" onChange={onChange}>
            {filters.map((filter, index) => {
              return (
                <option key={index} value={filter}>{filter}</option>
              );
            })}
          </select>
        </form>
      </div>

      <div className="gallery">
        {movies.map((movie, index) => {
          return (
            <div key={index} className={`card ${activeFilter === 'all' ? 'show-all' : ''} ${movie.genre.includes(activeFilter) ? 'show' : 'hide'}`}>
              <img src={`./images/${movie.image_name}`} alt="" />
              
              <div className="info">
                <h2>{movie.title}</h2>
                
                <div className="badges">
                  {movie.genre.map((genre, index) => {
                  return (
                    <div key={index}>
                      <p>{genre}</p>
                    </div>
                  );})}
                </div>
                  
                <p className="summary">{movie.plot}</p>

                <a href={movie.link}>Visit Movie</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
