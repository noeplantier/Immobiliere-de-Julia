import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './layouts/Header';
import AuthGuard from './_helpers/AuthGuard';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ErrorPage from './pages/ErrorPage';
import Footer from './layouts/Footer';
import LegalNotices from './components/LegalNotices';
import Faq from './components/Faq';
import GlobalContext from './context/GlobalContext';
import CreateEvent from './pages/CreateEstmation';
import MenuBar from './components/MenuBar';
import RegisterForm from './components/RegisterForm';
import ConnexionForm from './components/ConnexionForm';
import BuyPage from './pages/BuyPage';
import SalePage from './pages/SalePage';
import CreateEstimation from './pages/CreateEstmation';
import Forsale from './pages/ForSale';
import ContactForm from './components/ContactsForm/ContactsForm';

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
          <MenuBar /> 
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sales" element={<Forsale/>}/>
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<ConnexionForm />} />
              <Route path="/create-event" element={<CreateEvent />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/mentions-legales" element={<LegalNotices />} />
              <Route path="/buy" element={<BuyPage />} />
              <Route path="/rent" element={<SalePage />} />
              <Route path="/contacts" element={<ContactForm />} />
              <Route path="/estimate" element={<CreateEstimation />} />

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
                    <CreateEstimation />
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
