import { useState } from 'react'
import SignInUpForm from '../src/components/sign/sign'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<SignInUpForm />} />
      </Routes>
    </Router>
       
    </>
  )
}

export default App;