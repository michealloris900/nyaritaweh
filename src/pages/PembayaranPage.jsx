import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function PembayaranPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { topic, package: selectedPackage } = location.state || {}
  
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    gender: '',
    problem: '',
    contact: '',
    contactType: 'whatsapp'
  })
  
  const [paymentMethod, setPaymentMethod] = useState('transfer')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!topic || !selectedPackage) {
      navigate('/layanan')
    }
  }, [topic, selectedPackage, navigate])

  if (!topic || !selectedPackage) {
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      const whatsappNumber = "628817789866" // Nomor admin
      const message = `*ORDER BARU - NYARITAWEH*
      
Topik: ${topic.title}
Spesialis: ${topic.specialist}
Paket: ${selectedPackage.name} (${selectedPackage.duration})
Harga: ${selectedPackage.price}

*Data Pengguna:*
Nama: ${userData.name}
Usia: ${userData.age}
Jenis Kelamin: ${userData.gender}
Kontak: ${userData.contact} (${userData.contactType})

*Masalah:*
${userData.problem}

*Metode Pembayaran:* ${paymentMethod}

Mohon segera diproses.`
      
      const encodedMessage = encodeURIComponent(message)
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
      
      window.open(whatsappURL, '_blank')
      setIsSubmitting(false)
      
      // Redirect to thank you page
      navigate('/thank-you', { 
        state: { 
          topic, 
          package: selectedPackage,
          userData 
        }
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <div className="ml-2 font-medium text-green-600">Pilih Paket</div>
              </div>
              <div className="h-1 w-8 bg-green-500"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <div className="ml-2 font-medium text-green-600">Isi Data</div>
              </div>
              <div className="h-1 w-8 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <div className="ml-2 font-medium text-gray-500">Pembayaran</div>
              </div>
              <div className="h-1 w-8 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">4</div>
                <div className="ml-2 font-medium text-gray-500">Selesai</div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ringkasan Pesanan</h2>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-sm text-gray-600">{topic.specialist}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-amber-600">{selectedPackage.price}</div>
                  <div className="text-sm text-gray-600">{selectedPackage.duration}</div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-xl">
                <h4 className="font-bold text-gray-800 mb-2">Apa yang termasuk:</h4>
                <ul className="space-y-1">
                  {selectedPackage.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Form Data */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Diri (Anonim)</h2>
            
            <div className="space-y-6">
              {/* Nama */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Panggilan/Samaran *
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Contoh: Andi atau menggunakan nama samaran"
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                />
              </div>

              {/* Age & Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Usia *
                  </label>
                  <input
                    type="number"
                    required
                    min="12"
                    max="100"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Contoh: 25"
                    value={userData.age}
                    onChange={(e) => setUserData({...userData, age: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Kelamin *
                  </label>
                  <select
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={userData.gender}
                    onChange={(e) => setUserData({...userData, gender: e.target.value})}
                  >
                    <option value="">Pilih...</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor WhatsApp/Telegram *
                </label>
                <div className="flex space-x-4 mb-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactType"
                      value="whatsapp"
                      checked={userData.contactType === 'whatsapp'}
                      onChange={(e) => setUserData({...userData, contactType: e.target.value})}
                      className="mr-2"
                    />
                    <span>WhatsApp</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="contactType"
                      value="telegram"
                      checked={userData.contactType === 'telegram'}
                      onChange={(e) => setUserData({...userData, contactType: e.target.value})}
                      className="mr-2"
                    />
                    <span>Telegram</span>
                  </label>
                </div>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={userData.contactType === 'whatsapp' ? "081234567890" : "@username"}
                  value={userData.contact}
                  onChange={(e) => setUserData({...userData, contact: e.target.value})}
                />
              </div>

              {/* Problem Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ceritakan singkat masalahmu *
                </label>
                <textarea
                  required
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Jelaskan secara singkat masalah yang ingin kamu curhatkan..."
                  value={userData.problem}
                  onChange={(e) => setUserData({...userData, problem: e.target.value})}
                />
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Metode Pembayaran</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['transfer', 'gopay', 'ovo', 'qris'].map(method => (
                    <button
                      type="button"
                      key={method}
                      className={`p-4 border rounded-xl flex flex-col items-center justify-center ${paymentMethod === method ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
                      onClick={() => setPaymentMethod(method)}
                    >
                      <i className={`fab fa-${method === 'qris' ? 'qrcode' : method} text-3xl text-gray-700 mb-2`}></i>
                      <span className="text-sm font-medium capitalize">{method === 'qris' ? 'QRIS' : method}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Terms */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-gray-600">
                    Saya setuju dengan <a href="#" className="text-blue-600 hover:underline">Syarat & Ketentuan</a> dan <a href="#" className="text-blue-600 hover:underline">Kebijakan Privasi</a>. Saya memahami bahwa layanan ini bukan pengganti konsultasi medis profesional.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Memproses...
                  </span>
                ) : (
                  <span>Lanjutkan ke WhatsApp untuk Pembayaran</span>
                )}
              </button>

              {/* Info */}
              <p className="text-center text-sm text-gray-500">
                Setelah klik tombol di atas, Anda akan diarahkan ke WhatsApp untuk konfirmasi dan instruksi pembayaran.
              </p>
            </div>
          </form>

          {/* Back Link */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/layanan')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Kembali ke halaman layanan
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default PembayaranPage