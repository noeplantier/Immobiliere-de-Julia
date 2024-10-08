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

  const images = [
    'src/assets/Le-moulin-a-maree-du-Birlot.jpg',
    'src/assets/vue-de-la-ville-historique-dinan-avec-rivière-rance-département-cotes-d-armor-bretagne-france-du-nord-ouest-139921599.jpg.webp',
    'src/assets/phare.jpg',
    'src/assets/village-breton.jpg',
    'src/assets/instinct-voyageurs-road-trip-en-bretagne-720x480.jpg',
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      mirror: false,
    });
  }, []);

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

  return (
    <div className="homepage">
      <CookiePopup data-aos="zoom-in-up" />
      <h1 className="biens-title">Découvrez notre univers</h1>
      <div className="hero-img-container">
        <ChatBot/>
        
        
      </div>
      <div>
        <button
          className="create-event-button"
          onClick={handleCreateEventClick}
        >
          {'Faites estimer votre bien'}
        </button>
      </div>
      <Splitter />

      <h2 className="eventList_title" data-aos="zoom-in-up">
        {'Nos biens immobiliers'}
      </h2>
      <div
        ref={eventListRef}
        className={`event-list ${isEventListVisible ? 'visible' : ''}`}
        data-aos="zoom-in"
      >
       
      </div>

      <Splitter />

      <h2 className="eventList_title" data-aos="zoom-in-up">
        {'Découvrez notre patrimoine'}
      </h2>
      <div className="img-container" data-aos="zoom-in">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-image ${index === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
            onClick={() => handleImageClick(image)}
          ></div>
        ))}
      </div>

      {zoomedImage && (
        <div className="zoom-overlay" onClick={closeZoom}>
          <img src={zoomedImage} alt="Zoomed" className="zoomed-image" />
        </div>
      )}

      <Splitter />
      <Faq data-aos="zoom-in" />
     
    </div>
  );
}

export default HomePage;
