import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './Map';
import './styles.css';

const App = () => {
  const [tours, setTours] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);

  useEffect(() => {
    // Turlar ve şehirler API çağrıları
    axios.get('http://127.0.0.1:8000/tours/')
      .then(response => setTours(response.data))
      .catch(error => console.error('Turlar yüklenirken hata:', error));

    axios.get('http://127.0.0.1:8000/cities/')
      .then(response => setCities(response.data))
      .catch(error => console.error('Şehirler yüklenirken hata:', error));
  }, []);

  // Aktif turları filtrele
  const activeTours = tours.filter(tour => {
    const today = new Date();
    const start = new Date(tour.start_date);
    const end = new Date(tour.end_date);
    return today >= start && today <= end; // Tur aktif mi?
  });

  return (
    <div className="app-container">
      {/* Liste Alanı */}
      {/* <div className="list-container">
        <h1>JourneyVista</h1>
        <ul>
          {activeTours.map(tour => (
            <li
              key={tour.id}
              onClick={() => setSelectedTour(tour)}
              className={selectedTour?.id === tour.id ? 'selected-tour' : ''}
            >
              <h2>{tour.name}</h2>
              <p>Rehber: {tour.guide}</p>
              <p>Başlangıç: {new Date(tour.start_date).toLocaleDateString()}</p>
              <p>Bitiş: {new Date(tour.end_date).toLocaleDateString()}</p>
              
            </li>
          ))}
        </ul>
      </div> */}

      {/* Harita Alanı */}
      <div className="map-container">
        <Map tours={activeTours} cities={cities} selectedTour={selectedTour} />
      </div>
    </div>
  );
};

export default App;
