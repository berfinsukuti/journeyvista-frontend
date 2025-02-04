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

// Şehirlerin enlem ve boylam bilgileri
const cityCoordinates = {
  "Taşkent": [41.2995, 69.2400],
  "Almata": [43.2220, 76.8512],
  "Bişkek": [42.8746, 74.5698],
  "Cholpon Ata": [42.6499, 77.0820],
  "Luang Prabang": [19.8853, 102.4955],
  "Vientiane": [17.9757, 102.6331],
  "Phnom Penh": [11.5564, 104.9282],
  "Siem Reap": [13.3671, 103.8448],
  "Aşkabat": [37.9601, 58.3261],
  "Merv": [37.6000, 61.8333],
  "Marguş": [37.5000, 62.0000],
  "Bangkok": [13.7563, 100.5018],
  "Manila": [14.5995, 120.9842],
  "El Nido": [11.2027, 119.4358],
  "Bohol": [9.8500, 124.1833],
  "Boracay": [11.9674, 121.9248],
  "Ho Chi Minh City": [10.8231, 106.6297],
  "Hanoi": [21.0285, 105.8542],
  "Ha Long": [20.9500, 107.0833],
  "Cakarta": [-6.2088, 106.8456],
  "Bali": [-8.3405, 115.0920],
  "Yogyakarta": [-7.7956, 110.3695],
  "Makassar": [-5.1477, 119.4327],
  "Toraja": [-3.0362, 119.8877],
  "Prambanan": [-7.7519, 110.4910],
  "Borobudur": [-7.6079, 110.2038],
  "Kuala Lumpur": [3.1390, 101.6869],
  "Batı Papua": [-1.3361, 133.1747],
  "Jayapura": [-2.5337, 140.7181],
  "Wamena": [-4.1025, 138.9290],
  "Kuzey Baliem Vadisi": [-4.0000, 138.6667],
  "Hong Kong": [22.3193, 114.1694],
  "Singapur": [1.3521, 103.8198],
  "Sentosa Adası": [1.2494, 103.8303],
  "Erbil": [36.1911, 44.0094],
  "Musul": [36.3456, 43.1575],
  "Kerkük": [35.4681, 44.3922],
  "Erivan": [40.1792, 44.4991],
  "Garni": [40.1192, 44.7294],
  "Geghard": [40.1428, 44.8086],
  "Sevan Gölü": [40.4167, 45.3500],
  "Riyad": [24.7136, 46.6753],
  "Cape Town": [-33.9249, 18.4241],
  "Johannesburg": [-26.2041, 28.0473],
  "Pilanesberg": [-25.2523, 27.1025],
  "Stellenbosch": [-33.9346, 18.8668],
  "Lesedi Köyü": [-25.8700, 27.7900],
  "Antananarivo": [-18.8792, 47.5079],
  "Andasibe": [-18.9333, 48.4167],
  "Morondava": [-20.2833, 44.3167],
  "Port Louis": [-20.1609, 57.5012],
  "Viktoria Şelaleleri": [-17.9243, 25.8567],
  "Chobe Milli Parkı": [-18.6646, 24.5926],
  "Toronto": [43.6511, -79.3837],
  "Montreal": [45.5017, -73.5673],
  "Quebec": [46.8139, -71.2082],
  "Ottawa": [45.4215, -75.6972],
  "Niagara Şelalesi": [43.0962, -79.0377],
  "Mexico City": [19.4326, -99.1332],
  "Cancun": [21.1619, -86.8515],
  "Guadalajara": [20.6597, -103.3496],
  "Tequila": [20.8828, -103.8357],
  "Merida": [20.9674, -89.5926],
  "Havana": [23.1136, -82.3666],
  "Pinar del Río": [22.4175, -83.6987],
  "Vinales": [22.6187, -83.7066],
  "Varadero": [23.1799, -81.1890],
  "Cienfuegos": [22.1490, -80.4410],
  "Trinidad": [21.8056, -79.9841],
  "Santa Clara": [22.4069, -79.9643],
  "Guatemala City": [14.6349, -90.5069],
  "Antigua Guatemala": [14.5611, -90.7344],
  "Atitlan Gölü": [14.6869, -91.3020],
  "Panajachel": [14.7406, -91.1596],
  "Chichicastenango": [14.9436, -91.1115],
  "Panama City": [8.9824, -79.5199],
  "San Salvador": [13.6929, -89.2182],
  "Copan": [14.8340, -89.1561],
  "Izabal": [15.4000, -89.0000],
  "Rio Dulce": [15.6586, -88.9936],
  "Tikal": [17.2220, -89.6237],
  "Flores": [16.9250, -89.8921],
  "Leon": [12.4379, -86.8780],
  "Granada": [11.9299, -85.9560],
  "San Jose": [9.9281, -84.0907],
  "Irazu Volkanı": [9.9794, -83.8521],
  "Sao Paulo": [-23.5505, -46.6333],
  "Rio de Janeiro": [-22.9068, -43.1729],
  "Foz do Iguaçu": [-25.5163, -54.5854],
  "Buenos Aires": [-34.6037, -58.3816],
  "Ushuaia": [-54.8019, -68.3030],
  "El Calafate": [-50.3370, -72.2648],
  "Santiago": [-33.4489, -70.6693],
  "Valparaiso": [-33.0472, -71.6127],
  "Paskalya Adası": [-27.1127, -109.3497],
  "Calama": [-22.4575, -68.9235],
  "Magdalena Adası": [-52.9167, -70.5667],
  "Puerto Natales": [-51.7298, -72.5178],
  "Torres del Paine": [-51.0416, -73.0695],
  "Perito Moreno": [-50.4963, -73.1371],
  "Lima": [-12.0464, -77.0428],
  "Ica": [-14.0678, -75.7286],
  "Puerto Maldonado": [-12.5933, -69.1891],
  "Aguas Calientes": [-13.1588, -72.5258],
  "Puno": [-15.8402, -70.0219],
  "Cusco": [-13.5320, -71.9675],
  "Machu Picchu": [-13.1631, -72.5450],
  "Nazca": [-14.8356, -74.9328],
  "Ollantaytambo": [-13.2588, -72.2648],
  "Pisac": [-13.4150, -71.8456],
  "La Paz": [-16.5000, -68.1500],
  "Santa Cruz": [-17.7833, -63.1833],
  "Uyuni": [-20.4603, -66.8260],
  "Bogota": [4.7110, -74.0721],
  "Medellin": [6.2442, -75.5812],
  "Zipaquira": [5.0221, -74.0048],
  "Quito": [0.1807, -78.4678],
  "Guayaquil": [-2.1700, -79.9224],
  "Isla Baltra": [-0.4436, -90.2806],
  "Galapagos Adaları": [-0.9538, -90.9656],
  "Cuenca": [-2.9000, -79.0000],
  "Riobamba": [-1.6700, -78.6470],
  "Montevideo": [-34.9011, -56.1645],
  "Colonia del Sacramento": [-34.4626, -57.8398],
  "Asuncion": [-25.2637, -57.5759],
  "Ciudad del Este": [-25.5096, -54.6114],
  "Caracas": [10.4806, -66.9036],
  "Canaima": [6.2408, -62.8540],
  "Reykjavik": [64.1355, -21.8954],
  "Altın Çember": [64.2550, -20.8800],
  "Mavi Lagün": [63.8804, -22.4495],
  "Oslo": [59.9139, 10.7522],
  "Bergen": [60.3928, 5.3221],
  "St. Petersburg": [59.9343, 30.3351],
  "Murmansk": [68.9585, 33.0827],
  "Petrozavodsk": [61.7876, 34.3717],
  "Kazan": [55.8304, 49.0661],
  "Yekaterinburg": [56.8389, 60.6057],
  "Novosibirsk": [55.0084, 82.9357],
  "Irkutsk": [52.2869, 104.3050],
  "Ulan-Ude": [51.8335, 107.5842],
  "Kopenhag": [55.6761, 12.5683],
  "Nuuk": [64.1835, -51.7216],
  "Torshavn": [62.0079, -6.7716],
  "Sidney": [-33.8688, 151.2093],
  "Melbourne": [-37.8136, 144.9631],
  "Brisbane": [-27.4698, 153.0251],
  "Hobart": [-42.8821, 147.3272],
  "Nadi": [-17.7765, 177.4350],
  "Auckland": [-36.8485, 174.7633],
  "Wellington": [-41.2865, 174.7762],
  "Christchurch": [-43.5321, 172.6362],
  "Port Moresby": [-9.4438, 147.1803],
  "Mount Hagen": [-5.8575, 144.2306],
  "Goroka": [-6.0833, 145.3874],
  "Tokyo": [35.7246, 139.8373],
  "Xi'an": [34.3416, 108.9398],
  "Katmandu": [27.7172, 85.3240],
  "Pokhara": [28.2096, 83.9856],
  "Chitwan": [27.5291, 84.3542],
  "Paro": [27.4305, 89.4136],
  "Kolombo": [6.9271, 79.8612],
  "Kandy": [7.2906, 80.6337],
  "Nuwera Eliya": [6.9497, 80.7891],
  "Sigiria": [7.9569, 80.7603],
  "Negombo": [7.2083, 79.8358],
  "Pekin": [39.9042, 116.4074],
  "Şanghay": [31.2304, 121.4737],
  "Chengdu": [30.5728, 104.0668],
  "Chongqing": [29.5630, 106.5516],
  "Yangtze Nehri": [30.0000, 120.0000],
  "Urumçi":[43.8256, 87.6168],
  "Turfan":[42.9513, 89.1898],
  "Kaşgar": [39.4704, 75.9898],
  "Lhasa": [29.6520, 91.1721],
  "Tokyo": [35.6895, 139.6917],
  "Osaka": [34.6937, 135.5023],
  "Kyoto": [35.0116, 135.7681],
  "Hiroşima": [34.3853, 132.4553],
  "Kitakyushu": [33.8833, 130.8750],
  "Hakata": [33.5898, 130.4200],
  "Okinawa": [26.5013, 127.9454],
  "Kobe": [34.6901, 135.1955],
  "Seul": [37.5665, 126.9780],
  "Ulan Bator": [47.8864, 106.9057],
  "Karakorum": [47.1974, 102.8329],
  "Buhara":[39.7747, 64.4286],
  "Hiva":[41.3783, 60.3560],
  "Semerkant":[39.6542, 66.9597],
  "Taşkent": [41.2995, 69.240],
  "Almata": [43.2220, 76.8512],
  "Bişkek": [42.8746, 74.5698],
  "Cholpon Ata": [42.6499, 77.0820],
  "Luang Prabang": [19.8853, 102.4955],
  "Vientaine":[17.9757, 102.6331],
  "Phnom Penh":[11.5564, 104.9282],
  "Siem Reap":[13.3671, 103.8448],
  "Aşkabat": [37.9601, 58.3261],
  "Merv":[37.6000, 61.8333],
  "Marguş": [37.5000, 62.0000],
  "Bangkok":[13.7563, 100.5018],
  "Manila":[13.7563, 100.5018],
  "El Nido": [11.2027, 119.4358],
  "Bohol": [9.8500, 124.1833],
  "Boracay": [11.9674, 121.9248],
  "Ho Chi Minh City": [10.8231, 106.6297],
  "Hanoi": [21.0285, 105.8542],
  "Ha Long": [20.9500, 107.0833],
  "Jakarta": [-6.2088, 106.8456],
  "Bali": [-8.3405, 115.0920],
  "Yogyakarta": [-7.7956, 110.3695],
  "Makassar": [-5.1477, 119.4327],
  "Toraja": [-3.0362, 119.8877],
  "Prambanan": [-7.7519, 110.4910],
  "Borobudur": [-7.6079, 110.2038],
  "Kuala Lampur": [3.1390, 101.6869],
  "Batı Papua": [-1.3361, 133.1747],
  "Jayapura": [-2.5337, 140.7181],
  "Wamena": [-4.1025, 138.9290],
  "Kuzey Baliem Vadisi": [-4.0000, 138.6667],
  "İstanbul": [41.0077, 28.9884],
};

// Marker konumunu hafifçe kaydıran fonksiyon
const getOffsetCoordinates = (baseCoordinates, index) => {
  const offset = 0.5; // Küçük bir ofset miktarı
  const angle = (index * 360) / 10; // Çakışmayı önlemek için açı hesaplama
  const latOffset = offset * Math.cos((angle * Math.PI) / 180);
  const lonOffset = offset * Math.sin((angle * Math.PI) / 180);
  return [baseCoordinates[0] + latOffset, baseCoordinates[1] + lonOffset];
};

const Map = ({ tours }) => {
  return (
    <div className="app-container">
      {/* Liste Görünümü */}
      <div className="list-container">
        <h2>Tur Listesi</h2>
        <ul>
          {tours.map((tour) => {
            const today = new Date();
            const startDate = new Date(tour.start_date);
            const activeDayNumber =
              Math.ceil((today - startDate) / (1000 * 60 * 60 * 24)) || 1;

            return (
              <li key={tour.id} className="tour-item">
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

      {/* Harita Görünümü */}
      <div className="map-container">
        <MapContainer
          center={[41.0082, 28.9784]} // İstanbul koordinatları
          zoom={2.5}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {tours.map((tour) =>
            tour.days.map((day, index) => {
              const today = new Date();
              const startDate = new Date(tour.start_date);
              const dayDifference =
                Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;

                if (day.day_number === dayDifference) {
                  const basePosition = cityCoordinates[day.city];
                  if (!basePosition) {
                    console.error(
                      `Şehir (${day.city}) için koordinat bulunamadı! Lütfen cityCoordinates'e ekleyin.`
                    );
                    return null;
                  }
  
                  // Ofset uygulanmış koordinatları al
                  const offsetPosition = getOffsetCoordinates(basePosition, index);

                return (
                  <Marker
                    key={`${tour.id}-${day.day_number}-${index}`}
                    position={offsetPosition}
                    icon={customIcon}
                  >
                    <Popup>
                      <h3>{tour.name}</h3>
                      <img
                        src={tour.image}
                        alt={`${tour.name} görseli`}
                        style={{ width: "100%", height: "auto", marginBottom: "10px" }}
                      />
                      <p>Rehber: {tour.guide}</p>
                      <p><strong>Kaçıncı Gün:</strong> {day.day_number}</p>
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

