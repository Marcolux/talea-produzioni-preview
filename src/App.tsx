import { Routes, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar/NavigationBar';
import NavigationBarSmallScreen from './components/NavigationBarSmallScreen/NavigationBarSmallScreen';
import HomePage from './pages/HomePage';
import Page2 from './pages/Page2';
import Page1 from './pages/Page1';

import Footer from './components/Footer/Footer';

import './style/App.scss';
import { useEffect, useState } from 'react';

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
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Carousels" element={<Page1 />} />
        <Route path="/page_2" element={<Page2 />} />
      </Routes>

      <Footer/>
    </div>
  )
}

export default App
