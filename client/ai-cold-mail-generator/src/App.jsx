import React from "react"
import {useAuth} from './context/AuthContext.jsx';
import LandingPage from './pages/LandingPage.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {

  const {user, loading} = useAuth();
  if(loading){
    return <p>Loading...</p>
  }
 
  return (
   <Router>
    <Toaster position="top-right" />
    <Routes>
      <Route path="/" element = { <LandingPage /> } />
    </Routes>
   </Router>
  
  )
}

export default App
