import React from 'react'

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-purple-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <i className="fas fa-heart text-white"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Nyaritaweh</h2>
                <p className="text-sm text-gray-300">Tempat Curhat Online Indonesia</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Memberikan ruang aman untuk berbagi cerita dan perasaan tanpa takut dihakimi.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Layanan</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Curhat Percintaan</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Curhat Keluarga</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Curhat Pekerjaan</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Curhat Pendidikan</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Konseling Online</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Bantuan</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cara Kerja</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Hubungi Kami</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Kontak Darurat</h3>
            <p className="text-gray-300 mb-4">
              Jika kamu mengalami krisis atau pikiran untuk menyakiti diri sendiri, segera hubungi:
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-phone text-red-400"></i>
                </div>
                <div>
                  <p className="font-bold">119</p>
                  <p className="text-sm text-gray-300">Kementerian Kesehatan RI</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-headset text-blue-400"></i>
                </div>
                <div>
                  <p className="font-bold">0811-356-356</p>
                  <p className="text-sm text-gray-300">Sehat Jiwa Kemenkes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Nyaritaweh | Created by DulsInspirations <br /> Hak cipta dilindungi undang-undang.</p>
          <p className="text-gray-400 mt-2 text-sm">Dibuat dengan <i className="fas fa-heart text-red-400 mx-1"></i> untuk masyarakat Indonesia</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer