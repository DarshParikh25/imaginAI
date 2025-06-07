import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import BuyCredits from './pages/BuyCredits';
import Result from './pages/Result';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className='px-4 sm:pd-10 md:pd-14 lg:px-28 min-h-screen bg-[#070707] text-white'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/buy-credits' element={<BuyCredits />}/>
        <Route path='/result' element={<Result />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App;