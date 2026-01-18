import React from 'react'

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="text-center">
        <div className="relative">
          <div className="w-32 h-32 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-32 h-32 border-4 border-purple-500 rounded-full animate-spin border-t-transparent"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
              <i className="fas fa-heart text-white text-3xl"></i>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Memuat CurhatKita</h3>
          <p className="text-gray-600">Menyiapkan ruang aman untuk Anda...</p>
          
          <div className="mt-6 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader