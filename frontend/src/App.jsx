import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import BuyCredits from './pages/BuyCredits';
import Result from './pages/Result';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import { AppContext } from './context/AppContext';

const App = () => {

  const { showLogin } = useContext(AppContext);

  return (
    <div className='px-4 sm:pd-10 md:pd-14 lg:px-28 min-h-screen bg-[#070707] text-white'>
      <ToastContainer position='bottom-right' />
      <Navbar />
      {
        showLogin && <Login />
      }
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