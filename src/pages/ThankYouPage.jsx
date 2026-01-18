import React, { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function ThankYouPage() {
  const location = useLocation()
  const { topic, package: selectedPackage, userData } = location.state || {}

  useEffect(() => {
    if (!topic || !selectedPackage) {
      // Redirect if no state
      window.location.href = '/layanan'
    }
  }, [topic, selectedPackage])

  if (!topic || !selectedPackage) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <i className="fas fa-check text-white text-5xl"></i>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Pesanan Berhasil Dikirim!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Terima kasih telah memilih Nyaritaweh. Admin kami akan menghubungi Anda via WhatsApp dalam 5-15 menit.
          </p>

          {/* Order Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Detail Pesanan</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Topik</span>
                <span className="font-medium">{topic.title}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Spesialis</span>
                <span className="font-medium">{topic.specialist}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Paket</span>
                <span className="font-medium">{selectedPackage.name}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Durasi</span>
                <span className="font-medium">{selectedPackage.duration}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Harga</span>
                <span className="font-bold text-green-600">{selectedPackage.price}</span>
              </div>
              
              <div className="flex justify-between py-3">
                <span className="text-gray-600">Metode Kontak</span>
                <span className="font-medium">{userData?.contactType === 'whatsapp' ? 'WhatsApp' : 'Telegram'}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Langkah Selanjutnya:</h3>
            <ol className="text-left space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0">1</span>
                <span>Tunggu WhatsApp/Telegram dari admin kami dalam 5-15 menit</span>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0">2</span>
                <span>Admin akan mengirim instruksi pembayaran dan konfirmasi jadwal</span>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0">3</span>
                <span>Setelah pembayaran dikonfirmasi, Anda akan langsung terhubung dengan spesialis</span>
              </li>
            </ol>
          </div>

          {/* Important Notes */}
          <div className="bg-amber-50 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Catatan Penting:</h3>
            <ul className="text-left space-y-2 text-gray-700">
              <li className="flex items-start">
                <i className="fas fa-exclamation-circle text-amber-500 mr-2 mt-1"></i>
                <span>Pastikan WhatsApp/Telegram Anda aktif dan dapat menerima pesan</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-exclamation-circle text-amber-500 mr-2 mt-1"></i>
                <span>Jika tidak ada respon dalam 30 menit, silakan hubungi admin di 0812-3456-7890</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-exclamation-circle text-amber-500 mr-2 mt-1"></i>
                <span>Layanan ini bukan pengganti konsultasi medis profesional</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a 
              href={`https://wa.me/6281234567890`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity flex items-center justify-center"
            >
              <i className="fab fa-whatsapp mr-2"></i>
              Hubungi Admin via WhatsApp
            </a>
            
            <Link 
              to="/"
              className="bg-gray-100 text-gray-800 px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <i className="fas fa-robot mr-2"></i>
              Coba Gratis dengan AI
            </Link>
          </div>

          {/* Back to Home */}
          <div className="mt-8">
            <Link 
              to="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              <i className="fas fa-home mr-2"></i>
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ThankYouPage