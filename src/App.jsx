import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Tracks from './components/Tracks';
import InteractiveBoard from './components/InteractiveBoard';
import Speakers from './components/Speakers';
import Schedule from './components/Schedule';
import Organizers from './components/Organizers';
import Register from './components/Register';
import Footer from './components/Footer';
import { CONFIG } from './config';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-kasavu select-none antialiased">
      {/* Navigation Layer */}
      <Header />

      {/* Main Content Layer */}
      <main className="flex-grow">
        <Hero />
        <About />
        {CONFIG.showTracks && <Tracks />}
        <InteractiveBoard />
        <Speakers />
        {CONFIG.showSchedule && <Schedule />}
        <Organizers />
        <Register />
      </main>

      {/* Footer Layer */}
      <Footer />
    </div>
  );
}

export default App;
