import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import type { Event } from '../../@types';
import Faq from '../../components/Faq';
import Splitter from '../../components/Splitter';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CookiePopup from '../../components/CookiePopup/CookiePopup';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.scss';
import ContactForm from '../../components/ContactsForm/ContactsForm';
import ChatBot from '../../components/ChatBot/ChatBot';

function HomePage() {
  const { t } = useTranslation(); // Hook pour la traduction
  const API_URL = import.meta.env.VITE_API_URL;
  const [listEvents, setListEvents] = useState<Event[]>([]);
  const [userLocation, setUserLocation] = useState({
    lat: 49.100344,
    lon: 2.183486,
  });
  const [isEventListVisible, setIsEventListVisible] = useState(false);
  const eventListRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const navigate = useNavigate();

  const getlocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  const successCallback = useCallback((position: GeolocationPosition) => {
    setUserLocation({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    });
  }, []);

  const errorCallback = useCallback((error: GeolocationPositionError) => {
    console.log('Erreur de géolocalisation :', error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { lat, lon } = userLocation;
        if (!lat || !lon) throw new Error('Localisation non disponible.');

        const response = await fetch(
          `${API_URL}events?latitude=${lat}&longitude=${lon}`,
          {
            headers: {
              'X-Content-Type-Options': 'nosniff',
              'X-Frame-Options': 'DENY',
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok)
          throw new Error('Erreur lors de la récupération des événements.');

        const data = await response.json();
        setListEvents(data);
      } catch (error) {
        console.error('Erreur lors du fetch:', error);
      }
    };

    if (navigator.geolocation) {
      getlocation();
    } else {
      console.log("La géolocalisation n'est pas supportée par ce navigateur.");
    }

    fetchData();
  }, [API_URL, userLocation, getlocation]);

  useEffect(() => {
    const handleScroll = () => {
      if (eventListRef.current) {
        const rect = eventListRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setIsEventListVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleCreateEventClick = () => {
    navigate('/create-event');
  };

  const handleImageClick = (image: string) => {
    setZoomedImage(image);
  };

  const closeZoom = () => {
    setZoomedImage(null);
  };

  const handleSearch = () => {
    // Ajouter la logique pour la recherche de biens immobiliers ici
    console.log("Recherche de biens immobiliers lancée");
  };

  return (
    <div className="homepage">
      <CookiePopup data-aos="zoom-in-up" />
      <img className="brittany-sky"
          src="src/assets/brittany-sky.jpeg"
          alt="brittany-sky"
        />
      <h1 className="biens-title">Découvrez notre univers</h1>
      <h2>Forte de son engagement envers ses clients et de sa connaissance approfondie du marché, **L'Immobilière de Julia** accompagne les particuliers et les professionnels dans leurs projets, qu'ils soient à la recherche d'une résidence principale, d'une propriété de vacances ou d'investissements locatifs. Avec une approche personnalisée, Armel Moizant et son équipe mettent un point d'honneur à offrir un service de qualité, basé sur l'écoute, la transparence et la confiance.</h2>
        
      <div className="hero-img-container">
        <ChatBot/>
      </div>
      
      <div className="search-form">
        <div className="search-options">
          <button className="search-option">Acheter</button>
          <button className="search-option">Louer</button>
          <button className="search-option">Estimer</button>
        </div>
        <h2 className="search-title">Ma recherche</h2>
        <div className="dropdowns">
          <select className="dropdown">
            <option>Localisation</option>
            {/* Ajouter options API */}
          </select>
          <select className="dropdown">
            <option>Type de bien</option>
            {/* Ajouter options API */}
          </select>
          <select className="dropdown">
            <option>Budget</option>
            {/* Ajouter options API */}
          </select>
          <select className="dropdown">
            <option>Nombre de pièces</option>
            {/* Ajouter options API */}
          </select>
        </div>
        <button className="search-button" onClick={handleSearch}>Rechercher</button>
      </div>

      <Splitter />
      <Faq data-aos="zoom-in" />
    </div>
  );
}

export default HomePage;
