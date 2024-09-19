import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './layouts/Header';
import AuthGuard from './_helpers/AuthGuard';
import HomePage from './pages/HomePage';
import EventDetails from './pages/EventDetails';
import ProfilePage from './pages/ProfilePage';
import ErrorPage from './pages/ErrorPage';
import Footer from './layouts/Footer';
import LegalNotices from './components/LegalNotices';
import ContactsPage from './pages/ContactsPage';
import TeamPage from './pages/TeamPage';
import PartnersPage from './pages/PartnersPage';
import Faq from './components/Faq';
import EventCard from './components/EventCard';
import GlobalContext from './context/GlobalContext';
import CreateEvent from './pages/CreateEvent';
import EventList from './components/EventList';
import MenuBar from './components/MenuBar';
import RegisterForm from './components/RegisterForm';
import ConnexionForm from './components/ConnexionForm';
import FaireGerer from './pages/GestionPage';
import Acheter from './pages/BuyPage';
import SellPage from './pages/SellPage';
import Louer from './pages/RentPage';

function App() {
  const [user, setUser] = useState({});
  const value = {
    user,
    setUser,
  };
  return (
    <Router>
      <div className="App" style={{ maxWidth: '100vw' }}>
        <GlobalContext.Provider value={value}>
          <Header />
          <MenuBar /> {}
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<ConnexionForm />} />
              <Route path="/create-event" element={<CreateEvent />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/events" element={<EventDetails />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/event/:id" element={<EventDetails />} />
              <Route path="/mentions-legales" element={<LegalNotices />} />
              <Route path="/sell" element={<SellPage />} />
              <Route path="/buy" element={<Acheter />} />
              <Route path="/rent" element={<Louer />} />
              <Route path="/manage" element={<FaireGerer />} />




              <Route
                path="/user/me"
                element={
                  <AuthGuard>
                    <ProfilePage />
                  </AuthGuard>
                }
              />
              <Route
                path="/event"
                element={
                  <AuthGuard>
                    <CreateEvent />
                  </AuthGuard>
                }
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </main>
        </GlobalContext.Provider>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
