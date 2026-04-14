import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';

import NavigationBar from './components/NavigationBar/NavigationBar'
import NavigationBarSmallScreen from './components/NavigationBarSmallScreen/NavigationBarSmallScreen'
import Footer from './components/Footer/Footer'

import HomePage from './pages/HomePage/HomePage' 
import Servizi from './pages/Servizi/Servizi'
import TaleaHub from './pages/TaleaHub/TaleaHub'
import TaleaLab from './pages/TaleaLab/TaleaLab'
import Contatti from './pages/Contatti/Contatti'

import Audiovisivamente from './pages/Audiovisivamente/Home/AudiovisivamenteHome'
import AudiovisivamenteAnalogie from './pages/Audiovisivamente/Analogie/Analogie'
import AudiovisivamenteCineocchio from './pages/Audiovisivamente/Cineocchio/Cineocchio'
import AudiovisivamenteDistopie from './pages/Audiovisivamente/Distopie/Distopie'
import AudiovisivamenteEvoluzioni from './pages/Audiovisivamente/Evoluzione/Evoluzioni'
import AudiovisivamenteNatura360 from './pages/Audiovisivamente/Natura360/Natura360'

import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import './style/App.scss'


function App() {
  const [smallScreenView, setSmallScreenView] = useState('Regular')
  const handleResize = () => {
    window.innerWidth < 768 ? setSmallScreenView('SmallScreen') : setSmallScreenView('Regular')
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => { 
      window.removeEventListener('resize', handleResize)
    }
  },[])

  return (
    <div className="App flex flex-column col-12">
      {
        smallScreenView === 'Regular'
        ?
        <NavigationBar/>
        :
        <NavigationBarSmallScreen/>
      }
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/servizi" element={<Servizi/>} />
          <Route path="/talea-hub" element={<TaleaHub/>} />
          <Route path="/talea-lab" element={<TaleaLab/>} />
          <Route path="/contatti" element={<Contatti/>} />

          {/* Audiovisivamente */}
          <Route path="/audiovisivamente" element={<Audiovisivamente/>} />
          <Route path="/audiovisivamente/analogie" element={<AudiovisivamenteAnalogie/>} />
          <Route path="/audiovisivamente/cineocchio" element={<AudiovisivamenteCineocchio/>} />
          <Route path="/audiovisivamente/distopie" element={<AudiovisivamenteDistopie/>} />
          <Route path="/audiovisivamente/evoluzione" element={<AudiovisivamenteEvoluzioni/>} />
          <Route path="/audiovisivamente/natura-360" element={<AudiovisivamenteNatura360/>} />
        </Routes>

      <Footer/>
    </div>
  )
}

export default App
