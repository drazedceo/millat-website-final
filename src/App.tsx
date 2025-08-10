import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import About from './pages/About';
import OurStory from './pages/OurStory';
import VisionMissionValues from './pages/VisionMissionValues';
import LeadershipTeam from './pages/LeadershipTeam';
import CSRInitiatives from './pages/CSRInitiatives';
import AchievementsAwards from './pages/AchievementsAwards';
import Manufacturing from './pages/Manufacturing';
import Certifications from './pages/Certifications';
import Industries from './pages/Industries';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Capabilities from './pages/Capabilities';
import Compliance from './pages/Compliance';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <AnimatePresence mode="wait">
          <main>
            <Routes>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/our-story" element={<PageTransition><OurStory /></PageTransition>} />
              <Route path="/vision-mission-values" element={<PageTransition><VisionMissionValues /></PageTransition>} />
              <Route path="/leadership-team" element={<PageTransition><LeadershipTeam /></PageTransition>} />
              <Route path="/csr-initiatives" element={<PageTransition><CSRInitiatives /></PageTransition>} />
              <Route path="/achievements-awards" element={<PageTransition><AchievementsAwards /></PageTransition>} />
              <Route path="/manufacturing" element={<PageTransition><Manufacturing /></PageTransition>} />
              <Route path="/certifications" element={<PageTransition><Certifications /></PageTransition>} />
              <Route path="/industries" element={<PageTransition><Industries /></PageTransition>} />
              <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
              <Route path="/products/:productId" element={<PageTransition><ProductDetail /></PageTransition>} />
              <Route path="/capabilities" element={<PageTransition><Capabilities /></PageTransition>} />
              <Route path="/compliance" element={<PageTransition><Compliance /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="/get-in-touch" element={<PageTransition><Contact /></PageTransition>} />
            </Routes>
          </main>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
}

export default App;