import React from 'react';
import './index.scss';

const partners = [
  {
    name: 'AirBnB',
    logo: 'src/assets/airbnb-logo.png',
    url: 'https://www.airbnb.com',
  },
  {
    name: 'Kayak',
    logo: 'src/assets/kayak-logo.png',
    url: 'https://www.kayak.com',
  },
  {
    name: 'Booking.com',
    logo: 'src/assets/booking-logo.png',
    url: 'https://www.booking.com',
  },
  {
    name: 'Expedia',
    logo: 'src/assets/expedia-logo.png',
    url: 'https://www.expedia.com',
  },
  {
    name: 'TripAdvisor',
    logo: 'src/assets/tripadvisor-logo.png',
    url: 'https://www.tripadvisor.com',
  },
  {
    name: 'Trivago',
    logo: 'src/assets/trivago-logo.png',
    url: 'https://www.trivago.com',
  },
  {
    name: 'Hotels.com',
    logo: 'src/assets/hotels-logo.png',
    url: 'https://www.hotels.com',
  },
  {
    name: 'Skyscanner',
    logo: 'src/assets/skyscanner-logo.png',
    url: 'https://www.skyscanner.com',
  },
  {
    name: 'Google Travel',
    logo: 'src/assets/GoogleTravel-logo.png',
    url: 'https://www.google.com/travel',
  },
  {
    name: 'Hopper',
    logo: 'src/assets/hopper-logo.png',
    url: 'https://www.hopper.com',
  },
  {
    name: 'Orbitz',
    logo: 'src/assets/orbitz-logo.png',
    url: 'https://www.orbitz.com',
  },
  {
    name: 'Lastminute.com',
    logo: 'src/assets/lastminute-logo.png',
    url: 'https://www.lastminute.com',
  },
  {
    name: 'Agoda',
    logo: 'src/assets/agoda-logo.png',
    url: 'https://www.agoda.com',
  },
  {
    name: 'Momondo',
    logo: 'src/assets/momondo-logo.png',
    url: 'https://www.momondo.com',
  },
  {
    name: 'Priceline',
    logo: 'src/assets/priceline-logo.jpg',
    url: 'https://www.priceline.com',
  },
  {
    name: 'Cheapoair',
    logo: 'src/assets/cheapoair-logo.jpg',
    url: 'https://www.cheapoair.com',
  },
  {
    name: 'Travelocity',
    logo: 'src/assets/travelocity-logo.png',
    url: 'https://www.travelocity.com',
  },
  {
    name: 'Hotwire',
    logo: 'src/assets/hotwire-logo.png',
    url: 'https://www.hotwire.com',
  },
];

const PartnersPage = () => {
  return (
    <div className="partners-page">
      <h1>Nos Partenaires</h1>
      <ul className="partners-list">
        {partners.map((partner) => (
          <li key={partner.name} className="partner-item">
            <a href={partner.url} target="_blank" rel="noopener noreferrer">
              <img src={partner.logo} alt={`${partner.name} logo`} />
            </a>
            <h2>{partner.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PartnersPage;
