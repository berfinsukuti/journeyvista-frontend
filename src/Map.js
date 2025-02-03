// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Özel Marker İkonu
// const customIcon = new L.Icon({
//   iconUrl: '/marker.png', // Eğer public klasöründeyse
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
// });

// const Map = ({ tours }) => {
//   return (
//     <div className="app-container">
//       {/* Liste Görünümü */}
//       <div className="list-container">
//         <h2>Tur Listesi</h2>
//         <ul>
//           {tours.map((tour) => {
//             const today = new Date();
//             const startDate = new Date(tour.start_date);
//             const endDate = new Date(tour.end_date);

//             // Şu anki aktif gün numarasını hesapla
//             const activeDayNumber = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));

//             return (
//               <li key={tour.id} className="tour-item">
//                 <h3>{tour.name}</h3>
//                 <p>Rehber: {tour.guide}</p>
//                 <p>Başlangıç Tarihi: {new Date(tour.start_date).toLocaleDateString()}</p>
//                 <p>Bitiş Tarihi: {new Date(tour.end_date).toLocaleDateString()}</p>
//                 {tour.days.map((day) =>
//                   day.day_number === activeDayNumber ? (
//                     <p key={day.day_number}>
//                       <strong>Gün {day.day_number}:</strong> {day.city} - {day.description}
//                     </p>
//                   ) : null
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       </div>

//       {/* Harita Görünümü */}
//       <div className="map-container">
//         <MapContainer
//           center={[41.0082, 28.9784]} // İstanbul koordinatları
//           zoom={3}
//           style={{ height: '100%', width: '100%' }}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution="&copy; OpenStreetMap contributors"
//           />
// {tours.map((tour) =>
//   tour.days.map((day) => {
//     const today = new Date(); // Bugünün tarihi
//     const startDate = new Date(tour.start_date);
//     const dayDifference = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1; // Kaçıncı gün olduğunu hesapla

//     if (day.day_number === dayDifference && day.latitude && day.longitude) {
//       return (
//         <Marker
//           key={`${tour.id}-${day.day_number}`}
//           position={[day.latitude, day.longitude]} // Konum koordinatları
//           icon={customIcon}
//         >
//           <Popup>
//             <h3>{tour.name}</h3>
//             <img
//               src={tour.image}
//               alt={`${tour.name} görseli`}
//               style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
//             />
//             <p>Rehber: {tour.guide}</p>
//             <p><strong>Kaçıncı Gün:</strong> {day.day_number}</p>
//             <p>Şehir: {day.city}</p>
//             <p>Açıklama: {day.description}</p>
//             <p>Başlangıç: {new Date(tour.start_date).toLocaleDateString()}</p>
//             <p>Bitiş: {new Date(tour.end_date).toLocaleDateString()}</p>
//           </Popup>
//         </Marker>
//       );
//     }
//     return null;
//   })
// )}
//         </MapContainer>
//       </div>
//     </div>
//   );
// };

// export default Map;

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Özel Marker İkonu
const customIcon = new L.Icon({
  iconUrl: '/marker.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const Map = ({ tours, cities }) => {
  const getCityCoordinates = (cityName) => {
    const city = cities.find((c) => c.name === cityName);
    return city ? [city.latitude, city.longitude] : null;
  };

  return (
    <div className="app-container">
      {/* Liste Alanı */}
      <div className="list-container">
        <h2>Tur Listesi</h2>
        <ul>
          {tours.map((tour) => {
            const today = new Date();
            const startDate = new Date(tour.start_date);
            const activeDayNumber = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));

            return (
              <li key={tour.id}>
                <h3>{tour.name}</h3>
                <p>Rehber: {tour.guide}</p>
                <p>Başlangıç Tarihi: {new Date(tour.start_date).toLocaleDateString()}</p>
                <p>Bitiş Tarihi: {new Date(tour.end_date).toLocaleDateString()}</p>
                {tour.days.map((day) =>
                  day.day_number === activeDayNumber ? (
                    <p key={day.day_number}>
                      <strong>Gün {day.day_number}:</strong> {day.city} - {day.description}
                    </p>
                  ) : null
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Harita Alanı */}
      <div className="map-container">
        <MapContainer
          center={[41.0082, 28.9784]} // İstanbul koordinatları
          zoom={3}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {tours.map((tour) =>
            tour.days.map((day) => {
              const today = new Date();
              const startDate = new Date(tour.start_date);
              const dayDifference = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
              const coordinates = getCityCoordinates(day.city);

              if (day.day_number === dayDifference && coordinates) {
                return (
                  <Marker
                    key={`${tour.id}-${day.day_number}`}
                    position={coordinates}
                    icon={customIcon}
                  >
                    <Popup>
                      <h3>{tour.name}</h3>
                      <img
                        src={tour.image}
                        alt={`${tour.name} görseli`}
                        style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                      />
                      <p>Rehber: {tour.guide}</p>
                      <p>
                        <strong>Kaçıncı Gün:</strong> {day.day_number}
                      </p>
                      <p>Şehir: {day.city}</p>
                      <p>Açıklama: {day.description}</p>
                      <p>Başlangıç: {new Date(tour.start_date).toLocaleDateString()}</p>
                      <p>Bitiş: {new Date(tour.end_date).toLocaleDateString()}</p>
                    </Popup>
                  </Marker>
                );
              }
              return null;
            })
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;

