import React from 'react';
import './index.scss';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Utilise React Leaflet pour la carte interactive
import 'leaflet/dist/leaflet.css';

const biensData = [
  {
    id: 1,
    title: "Maison T3 à Crosne",
    status: "À vendre",
    surface: "85m²",
    location: "Crosne, 91560",
    saleDate: "2024-10-01",
    price: "350,000 €",
    description: "Belle maison de 3 pièces avec jardin à Crosne.",
    energyRating: "C",
    gasEmission: "D",
    coordinates: [48.6844, 2.4441]
  },
  // Ajoute plus de biens immobiliers ici
];

const Forsale = () => {
  return (
    <div className="biens-container">
      <h1 className="biens-title">Nos biens immobiliers</h1>

      <div className="biens-list">
        {biensData.map((bien) => (
          <div key={bien.id} className="bien-card">
            <h2>{bien.title}</h2>
            <p><strong>État :</strong> {bien.status}</p>
            <p><strong>Surface :</strong> {bien.surface}</p>
            <p><strong>Localisation :</strong> {bien.location}</p>
            <p><strong>Date de mise en vente :</strong> {bien.saleDate}</p>
            <p><strong>Prix :</strong> {bien.price}</p>
            <p><strong>Description :</strong> {bien.description}</p>
            <p><strong>Bilan énergétique :</strong> {bien.energyRating}</p>
            <p><strong>Émission de gaz :</strong> {bien.gasEmission}</p>
          </div>
        ))}
      </div>

      <div className="map-container">
        <h2>Localisation des biens</h2>
        <MapContainer center={[48.6844, 2.4441]} zoom={8} className="biens-map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {biensData.map((bien) => (
            <Marker key={bien.id} position={bien.coordinates}>
              <Popup>{bien.title}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Forsale;