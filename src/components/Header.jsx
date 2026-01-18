import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm dark:shadow-gray-800/20">
      <div className="w-full mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <i className="fas fa-heart text-white"></i>
            </div>
            <Link to="/">
              <div>
                <h1 className="text-2xl font-bold gradient-text dark:from-purple-400 dark:to-pink-400">Nyaritaweh</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Tempat Curhat Online Indonesia</p>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center">
            <Link 
              to="/" 
              className={`${isActive('/') ? 'text-purple-600 dark:text-purple-400 font-medium' : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'} transition-colors duration-300`}
            >
              Beranda
            </Link>
            
            <Link 
              to="/layanan" 
              className={`${isActive('/layanan') ? 'text-amber-600 dark:text-amber-400 font-medium' : 'text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400'} transition-colors duration-300 flex items-center`}
            >
              <i className="fas fa-crown mr-1 text-sm"></i>
              Layanan Premium
            </Link>
            
            <a 
              href="#testimonials" 
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
            >
              Testimoni
            </a>
            
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <i className={`fas fa-${darkMode ? 'sun' : 'moon'}`}></i>
            </button>
          </nav>
          
          <div className="flex items-center space-x-4 md:hidden">
            <Link 
              to="/layanan" 
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center"
            >
              <i className="fas fa-crown mr-1"></i>
              Premium
            </Link>
            
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300"
            >
              <i className={`fas fa-${darkMode ? 'sun' : 'moon'}`}></i>
            </button>
            
            <button 
              className="text-gray-700 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className={`fas fa-${isMenuOpen ? 'times' : 'bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="mt-4 md:hidden animate__animated animate__fadeInDown bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
            <div className="flex flex-col space-y-4 py-4">
              <Link 
                to="/" 
                className={`${isActive('/') ? 'text-purple-600 dark:text-purple-400 font-medium' : 'text-gray-700 dark:text-gray-300'} transition-colors duration-300`}
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </Link>
              
              <Link 
                to="/layanan" 
                className={`${isActive('/layanan') ? 'text-amber-600 dark:text-amber-400 font-medium' : 'text-gray-700 dark:text-gray-300'} transition-colors duration-300 flex items-center`}
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-crown mr-2"></i>
                Layanan Premium
              </Link>
              
              <a 
                href="#testimonials" 
                className="text-gray-700 dark:text-gray-300 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimoni
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header