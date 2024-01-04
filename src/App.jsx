import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import Investor from './pages/Investor';



function App() {

  return (

    <Routes>
      <Route 
        path="/" 
        element={
          <Home/>} />
      <Route 
        path="/investor" 
        element={
          <Investor
          />
        } 
      />

    </Routes>
  )
}

export default App
