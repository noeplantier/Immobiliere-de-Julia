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
import ChatBot from '../../components/ChatBot/ChatBot';
import PropertySearchForm from '../../components/PropertySearchForm';
import Forsale from '../ForSale';
import ValuesPage from '../ValuesPage';
import About from '../AboutPage';
import SuccessPage from '../SuccessPage';

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

  const getLocation = useCallback(() => {
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

      <div className="hero-img-container">
        <ChatBot />
        <Splitter />
        <About/>
        <Splitter/>
        <ValuesPage/>
        <Splitter/>
        <SuccessPage/>
        <Splitter />
        <Forsale />
        <Splitter />
      </div>
    </div>
  );
}

export default HomePage;
