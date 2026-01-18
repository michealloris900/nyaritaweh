import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Topics from '../components/Topics'
import ChatBox from '../components/ChatBox'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
import FloatingButton from '../components/FloatingButton'
import PrivasiModal from '../components/PrivasiModal'

function HomePage() {
  const [activeTopic, setActiveTopic] = useState('percintaan')

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-50 overflow-x-hidden">
      <Header />
      <Hero />
      
      {/* Banner Upgrade ke Layanan Premium - ATAS */}
      <div className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center">
              <i className="fas fa-crown mr-2"></i>
              <span className="font-medium">Butuh bantuan lebih personal?</span>
            </div>
            <Link 
              to="/layanan" 
              className="bg-white text-amber-600 px-4 py-1 rounded-full font-bold hover:bg-gray-100 transition-colors text-sm"
            >
              Coba Layanan Human Premium →
            </Link>
          </div>
        </div>
      </div>
      
      <div className="w-full">
        <Topics activeTopic={activeTopic} setActiveTopic={setActiveTopic} />
      </div>
      
      <div className="w-full">
        <ChatBox activeTopic={activeTopic} />
      </div>
      
      {/* Banner Upgrade ke Layanan Premium - BAWAH */}
      <div className="w-full mt-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 md:p-8 text-white shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-user-md text-lg"></i>
                    </div>
                    <h3 className="text-xl font-bold">Butuh Bantuan Langsung dari Ahli?</h3>
                  </div>
                  <p className="text-white/90 mb-4">
                    Curha AI bagus untuk dukungan awal, tetapi untuk masalah yang lebih komplebut, 
                    konsultasi langsung dengan psikolog berpengalaman bisa memberikan solusi yang lebih personal.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <i className="fas fa-check-circle mr-2 text-emerald-300"></i>
                      Konsultasi 1-on-1 dengan psikolog bersertifikat
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check-circle mr-2 text-emerald-300"></i>
                      Sesi video call yang aman dan privasi terjamin
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check-circle mr-2 text-emerald-300"></i>
                      Program tindak lanjut dan monitoring progress
                    </li>
                  </ul>
                </div>
                
                <div className="text-center md:text-right">
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm mb-4">
                    <div className="text-3xl font-bold">Rp 150.000</div>
                    <div className="text-white/80">/sesi (60 menit)</div>
                    <div className="text-xs mt-2 text-emerald-200">Harga khusus pendaftar pertama</div>
                  </div>
                  
                  <Link 
                    to="/layanan" 
                    className="inline-flex items-center bg-white text-emerald-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
                  >
                    <i className="fas fa-calendar-check mr-2"></i>
                    Jadwalkan Konsultasi Sekarang
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full">
        <Testimonials />
      </div>
      
      <div className="w-full">
        <Footer />
      </div>
      
      <FloatingButton />
      <PrivasiModal />
    </div>
  )
}

export default HomePage