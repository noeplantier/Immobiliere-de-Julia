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
import PropertySearchForm from '../../components/PropertySearchForm';
import Forsale from '../ForSale';

function HomePage() {
  const { t } = useTranslation();
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


  const handleSearch = () => {
    console.log("Recherche de biens immobiliers lancée");
  };

  return (
    <div className="homepage">
      <CookiePopup data-aos="zoom-in-up" />
      
      <div className="hero-container">
        <img
          className="brittany-sky"
          src="src/assets/brittany-sky.jpeg"
          alt="brittany-sky"
        />
        <PropertySearchForm />

      </div>
      
      <h1 className="biens-title">Découvrez notre univers</h1>
      <h2>
        Forte de son engagement envers ses clients et de sa connaissance approfondie du marché, 
        <strong>l'Immobilière de Julia</strong> accompagne les particuliers et les professionnels dans leurs projets, 
        qu'ils soient à la recherche d'une résidence principale, d'une propriété de vacances ou d'investissements locatifs.<br></br> 
        Avec une approche personnalisée, Armel Moizant et son équipe mettent un point d'honneur à offrir un service de qualité, 
        basé sur l'écoute, la transparence et la confiance.
      </h2>
          
      <div className="hero-img-container">
        <ChatBot />
  
        <Splitter />
        <Forsale/>
        <Splitter />
      </div>
    </div>
  );
}

export default HomePage;
