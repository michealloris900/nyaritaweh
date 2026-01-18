import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LayananPage from './pages/LayananPage'
import PembayaranPage from './pages/PembayaranPage'
import ThankYouPage from './pages/ThankYouPage'

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen overflow-x-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/layanan" element={<LayananPage />} />
          <Route path="/pembayaran" element={<PembayaranPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App