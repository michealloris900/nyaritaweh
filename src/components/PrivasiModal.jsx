import React, { useState } from 'react'

function PrivasiModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-white text-gray-800 px-4 py-3 rounded-full shadow-lg flex items-center space-x-2 hover:shadow-xl transition-all duration-300 animate__animated animate__fadeInLeft"
      >
        <i className="fas fa-lock text-purple-600"></i>
        <span className="font-medium">Privasi & Keamanan</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate__animated animate__fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate__animated animate__zoomIn">
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Privasi & Keamanan Data</h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="fas fa-shield-alt text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-2">Data Anda Aman</h3>
                    <p className="text-gray-600">
                      Semua percakapan di CurhatKita dienkripsi end-to-end. Tidak ada yang dapat mengakses isi curhat Anda, termasuk tim kami.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="fas fa-user-secret text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-2">Anonimitas Terjaga</h3>
                    <p className="text-gray-600">
                      Anda tidak perlu menggunakan nama asli atau informasi pribadi. Kami tidak menyimpan data identitas pengguna.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="fas fa-trash-alt text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-2">Percakapan Tidak Disimpan</h3>
                    <p className="text-gray-600">
                      Setelah sesi curhat selesai, percakapan akan dihapus secara otomatis setelah 24 jam. Tidak ada rekaman percakapan.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="fas fa-user-md text-amber-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-2">Pendengar Profesional</h3>
                    <p className="text-gray-600">
                      Tim pendengar kami telah melalui pelatihan khusus tentang etika, empati, dan menjaga kerahasiaan.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-bold text-gray-800 mb-2">Catatan Penting:</h4>
                  <ul className="text-gray-600 space-y-2 pl-5 list-disc">
                    <li>CurhatKita bukan pengganti layanan profesional psikolog atau psikiater</li>
                    <li>Dalam keadaan darurat atau krisis, hubungi layanan darurat yang tersedia</li>
                    <li>Jika Anda di bawah 18 tahun, disarankan untuk curhat dengan orang tua atau wali</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 p-6">
              <div className="flex justify-between">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors"
                >
                  Tutup
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  Saya Mengerti
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PrivasiModal