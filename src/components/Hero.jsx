import React from 'react'

function Hero() {
  const scrollToChat = () => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback jika element belum ada
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  const scrollToTopics = () => {
    const topicsSection = document.getElementById('topics-section');
    if (topicsSection) {
      topicsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="py-12 md:py-20 gradient-bg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 animate__animated animate__fadeInLeft">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Curhat Tanpa Rasa <span className="gradient-text">Khawatir</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Sampaikan isi hatimu tanpa takut dihakimi. Di Nyaritaweh, kami mendengarkan dengan penuh perhatian dan memberikan dukungan yang kamu butuhkan.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={scrollToChat}
                className="btn-primary text-white py-3 px-8 rounded-full font-medium text-center shadow-lg hover:opacity-90 transition-opacity"
              >
                Mulai Curhat Sekarang <i className="fas fa-arrow-right ml-2"></i>
              </button>
              <button 
                onClick={scrollToTopics}
                className="border border-purple-500 text-purple-600 py-3 px-8 rounded-full font-medium text-center hover:bg-purple-50 transition-colors duration-300"
              >
                Pelajari Lebih Lanjut
              </button>
            </div>
            
            <div className="mt-10 flex items-center space-x-6">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-blue-200 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-purple-200 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-pink-200 border-2 border-white"></div>
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-800">10.000+</p>
                  <p className="text-sm text-gray-600">Pengguna Terdaftar</p>
                </div>
              </div>
              
              <div className="hidden md:block">
                <div className="flex items-center">
                  <div className="text-yellow-400">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                  <div className="ml-2">
                    <p className="font-bold text-gray-800">4.8/5</p>
                    <p className="text-sm text-gray-600">Rating Pengguna</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center animate__animated animate__fadeInRight">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center animate-float">
                <div className="w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full flex items-center justify-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full flex flex-col items-center justify-center">
                    <i className="fas fa-heart text-white text-6xl mb-4"></i>
                    <p className="text-white font-bold text-xl">Nyaritaweh</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-2 -right-2 bg-white p-4 rounded-xl shadow-lg animate-pulse-slow">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-lock text-green-600"></i>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Aman & Privasi</p>
                    <p className="text-xs text-gray-600">Terenkripsi end-to-end</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg animate-pulse-slow" style={{animationDelay: '1s'}}>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-user-shield text-blue-600"></i>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Pendengar Terlatih</p>
                    <p className="text-xs text-gray-600">Profesional & berpengalaman</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero