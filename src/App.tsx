import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useEffect, useState } from 'react';
import './style/App.scss'

import NavigationBar from './components/NavigationBar/NavigationBar'
import NavigationBarSmallScreen from './components/NavigationBarSmallScreen/NavigationBarSmallScreen'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import PageLoader from './components/PageLoader/PageLoader'

const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const Servizi = lazy(() => import('./pages/Servizi/Servizi'))
const TaleaHub = lazy(() => import('./pages/TaleaHub/TaleaHub'))
const TaleaLab = lazy(() => import('./pages/TaleaLab/TaleaLab'))
const Contatti = lazy(() => import('./pages/Contatti/Contatti'))
const Audiovisivamente = lazy(() => import('./pages/Audiovisivamente/Home/AudiovisivamenteHome'))
const AudiovisivamenteAnalogie = lazy(() => import('./pages/Audiovisivamente/Analogie/Analogie'))
const AudiovisivamenteCineocchio = lazy(() => import('./pages/Audiovisivamente/Cineocchio/Cineocchio'))
const AudiovisivamenteDistopie = lazy(() => import('./pages/Audiovisivamente/Distopie/Distopie'))
const AudiovisivamenteEvoluzioni = lazy(() => import('./pages/Audiovisivamente/Evoluzione/Evoluzioni'))
const AudiovisivamenteNatura360 = lazy(() => import('./pages/Audiovisivamente/Natura360/Natura360'))


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
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>

      <Footer/>
    </div>
  )
}

export default App
