import React, { useState } from 'react'

function FloatingButton() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <div 
        className={`fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3 transition-all duration-300 ${isExpanded ? 'animate__animated animate__fadeInUp' : ''}`}
      >
        {isExpanded && (
          <>
            <a 
              href="#chat" 
              className="bg-white text-gray-800 px-5 py-3 rounded-full shadow-lg flex items-center space-x-3 hover:shadow-xl transition-all duration-300 animate__animated animate__fadeInRight"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <i className="fas fa-comment text-white"></i>
              </div>
              <div className="text-left">
                <p className="font-bold">Mulai Curhat</p>
                <p className="text-xs text-gray-600">Klik untuk berbagi cerita</p>
              </div>
            </a>
            
            <a 
              href="#topics" 
              className="bg-white text-gray-800 px-5 py-3 rounded-full shadow-lg flex items-center space-x-3 hover:shadow-xl transition-all duration-300 animate__animated animate__fadeInRight"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <i className="fas fa-list text-white"></i>
              </div>
              <div className="text-left">
                <p className="font-bold">Pilih Topik</p>
                <p className="text-xs text-gray-600">Temukan yang sesuai</p>
              </div>
            </a>
            
            <a 
              href="#testimonials" 
              className="bg-white text-gray-800 px-5 py-3 rounded-full shadow-lg flex items-center space-x-3 hover:shadow-xl transition-all duration-300 animate__animated animate__fadeInRight"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <i className="fas fa-star text-white"></i>
              </div>
              <div className="text-left">
                <p className="font-bold">Testimoni</p>
                <p className="text-xs text-gray-600">Lihat pengalaman lain</p>
              </div>
            </a>
          </>
        )}
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all duration-300"
        >
          <i className={`fas fa-${isExpanded ? 'times' : 'comment'} text-2xl transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}></i>
        </button>
      </div>
      
      {/* Backdrop for mobile */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-30 bg-black/10 md:hidden"
          onClick={() => setIsExpanded(false)}
        ></div>
      )}
    </>
  )
}

export default FloatingButton