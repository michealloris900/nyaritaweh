import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function LayananPage() {
  const navigate = useNavigate()
  const [selectedTopic, setSelectedTopic] = useState('percintaan')
  const [selectedPackage, setSelectedPackage] = useState(null)

  const topics = [
    {
      id: 'percintaan',
      title: 'Percintaan',
      icon: 'fa-heart',
      color: 'from-red-400 to-pink-500',
      description: 'Masalah hubungan, putus cinta, atau kebingungan perasaan',
      specialist: 'Rania - Pendengar Percintaan',
      experience: '3+ tahun berpengalaman'
    },
    {
      id: 'keluarga',
      title: 'Keluarga',
      icon: 'fa-home',
      color: 'from-blue-400 to-cyan-500',
      description: 'Konflik keluarga, hubungan dengan orang tua, atau masalah rumah tangga',
      specialist: 'Budi - Pendengar Keluarga',
      experience: '5+ tahun berpengalaman'
    },
    {
      id: 'pekerjaan',
      title: 'Pekerjaan & Karir',
      icon: 'fa-briefcase',
      color: 'from-green-400 to-emerald-500',
      description: 'Stres pekerjaan, konflik dengan rekan, atau kebingungan karir',
      specialist: 'Sari - Pendengar Karir',
      experience: '7+ tahun HR Experience'
    },
    {
      id: 'kesehatan-mental',
      title: 'Kesehatan Mental',
      icon: 'fa-brain',
      color: 'from-indigo-400 to-blue-500',
      description: 'Kecemasan, stres, depresi, atau masalah kesehatan mental lainnya',
      specialist: 'Dr. Maya - Psikolog',
      experience: 'Psikolog terdaftar HIMPSI'
    }
  ]

  const packages = [
    {
      id: 1,
      name: "Paket 15 Menit",
      duration: "15 menit",
      price: "Rp 25.000",
      features: [
        "Sesi curhat personal 1-on-1",
        "Pendengar manusia berpengalaman",
        "Respon empatik dan personal",
        "Via WhatsApp/Telegram"
      ],
      popular: false
    },
    {
      id: 2,
      name: "Paket 30 Menit",
      duration: "30 menit",
      price: "Rp 45.000",
      features: [
        "Waktu lebih panjang",
        "Diskusi lebih mendalam",
        "Problem-solving guidance",
        "Follow-up questions",
        "Via WhatsApp/Telegram"
      ],
      popular: true
    },
    {
      id: 3,
      name: "Paket 60 Menit",
      duration: "60 menit",
      price: "Rp 80.000",
      features: [
        "Sesi komprehensif",
        "Deep emotional support",
        "Actionable recommendations",
        "Optional follow-up check",
        "Via WhatsApp/Telegram"
      ],
      popular: false
    }
  ]

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg)
    navigate('/pembayaran', { 
      state: { 
        topic: topics.find(t => t.id === selectedTopic),
        package: pkg
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header />
      
      {/* Hero Section Layanan */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full mb-6">
              <i className="fas fa-crown mr-2"></i>
              <span className="font-medium">Layanan Premium</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Chat dengan Pendengar Manusia</h1>
            <p className="text-xl text-white/90 mb-8">
              Dapatkan dukungan personal dari pendengar berpengalaman. Lebih empatik, lebih memahami, lebih membantu.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a href="#pricing" className="bg-white text-amber-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                Lihat Paket
              </a>
              <Link to="/" className="bg-white/20 text-white px-8 py-3 rounded-full font-bold hover:bg-white/30 transition-colors">
                Coba Gratis dengan AI
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Specialist Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Pilih Topik & Spesialis</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Setiap spesialis memiliki pengalaman dan keahlian di bidangnya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {topics.map(topic => (
              <div 
                key={topic.id}
                className={`bg-white rounded-2xl p-6 cursor-pointer border-2 transition-all ${selectedTopic === topic.id ? 'border-amber-300 shadow-xl' : 'border-transparent hover:border-amber-200'}`}
                onClick={() => setSelectedTopic(topic.id)}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mb-4 mx-auto`}>
                  <i className={`fas ${topic.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{topic.title}</h3>
                <p className="text-gray-600 text-center text-sm mb-4">{topic.description}</p>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <i className="fas fa-user text-amber-600"></i>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{topic.specialist.split(' - ')[0]}</p>
                      <p className="text-xs text-gray-600">{topic.experience}</p>
                    </div>
                  </div>
                </div>
                
                {selectedTopic === topic.id && (
                  <div className="mt-4 text-center">
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                      Dipilih
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pricing Section */}
          <div id="pricing" className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Pilih Paket Layanan</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Semua paket termasuk chat via WhatsApp/Telegram dengan spesialis pilihanmu
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {packages.map(pkg => (
                <div 
                  key={pkg.id}
                  className={`bg-white rounded-2xl shadow-xl overflow-hidden border-2 ${pkg.popular ? 'border-amber-300 transform md:-translate-y-4' : 'border-gray-100'}`}
                >
                  {pkg.popular && (
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-2 font-bold">
                      PALING POPULAR
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-amber-600 mb-2">{pkg.name}</h3>
                      <div className="text-4xl font-bold text-gray-800 mb-1">{pkg.price}</div>
                      <div className="text-gray-600 mb-4">{pkg.duration} sesi</div>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <i className="fas fa-check text-green-500 mr-3 mt-1"></i>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button 
                      onClick={() => handleSelectPackage(pkg)}
                      className={`w-full py-3 rounded-full font-medium ${pkg.popular ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'} transition-colors`}
                    >
                      Pilih Paket Ini
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="py-16 bg-white rounded-3xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Cara Kerja Layanan Kami</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">1</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Pilih Paket</h3>
                <p className="text-gray-600">Pilih topik dan paket durasi sesuai kebutuhanmu</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">2</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Isi Data</h3>
                <p className="text-gray-600">Isi form singkat tentang masalahmu (anonim)</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">3</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Bayar</h3>
                <p className="text-gray-600">Bayar via transfer, e-wallet, atau QRIS</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">4</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Chat via WA</h3>
                <p className="text-gray-600">Terhubung langsung dengan spesialis via WhatsApp</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Pertanyaan Umum</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Bagaimana cara pembayaran?</h3>
                <p className="text-gray-600">Kami menerima transfer bank (BCA, Mandiri, BRI), e-wallet (Gopay, OVO, Dana), dan QRIS.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Apakah benar-benar anonim?</h3>
                <p className="text-gray-600">Ya! Kami tidak meminta data pribadi asli. Anda bisa menggunakan nama samaran. Sesi tidak direkam dan chat dihapus setelah 24 jam.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Berapa lama respons dari spesialis?</h3>
                <p className="text-gray-600">Setelah pembayaran dikonfirmasi, spesialis akan merespon dalam 5-15 menit selama jam kerja (08:00 - 22:00 WIB).</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Siap untuk curhat dengan pendengar manusia?</h2>
            <Link 
              to="/" 
              className="inline-flex items-center text-amber-600 font-bold hover:text-amber-700"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Atau coba dulu gratis dengan AI Assistant
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default LayananPage