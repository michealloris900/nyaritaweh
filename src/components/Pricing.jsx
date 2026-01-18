import React from 'react'

function Pricing() {
  const pricingPlans = [
    {
      name: "Basic",
      price: "Gratis",
      period: "selamanya",
      description: "Chat dengan AI Assistant",
      features: [
        "Respons cepat 24/7",
        "Anonimitas terjamin",
        "Dukungan dasar untuk curhat",
        "6 topik curhat tersedia",
        "Tidak ada batasan waktu"
      ],
      buttonText: "Mulai Gratis",
      popular: false,
      color: "blue"
    },
    {
      name: "Premium",
      price: "Rp 25.000",
      period: "per 15 menit",
      description: "Chat dengan Human Specialist",
      features: [
        "Pendengar manusia berpengalaman",
        "Respon empatik dan personal",
        "Saran yang lebih kontekstual",
        "Support krisis yang lebih baik",
        "Semua topik curhat tersedia",
        "Sesi aman & terenkripsi"
      ],
      buttonText: "Pilih Premium",
      popular: true,
      color: "amber"
    },
    {
      name: "Pro",
      price: "Rp 150.000",
      period: "per bulan",
      description: "Paket Bulanan Unlimited",
      features: [
        "Akses unlimited ke human specialist",
        "Prioritas koneksi",
        "Sesi hingga 60 menit",
        "Follow-up session",
        "Catatan sesi (opsional)",
        "Support 24/7 via WhatsApp"
      ],
      buttonText: "Pilih Pro",
      popular: false,
      color: "purple"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Pilih Paket yang Tepat untuk Anda</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dapatkan dukungan yang sesuai dengan kebutuhanmu. Mulai dari gratis hingga premium dengan pendengar manusia.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl shadow-xl overflow-hidden border-2 ${plan.popular ? 'border-amber-300 transform md:-translate-y-4' : 'border-gray-100'}`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-2 font-bold">
                  PALING POPULAR
                </div>
              )}
              
              <div className="p-6">
                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-bold text-${plan.color}-600 mb-2`}>{plan.name}</h3>
                  <div className="text-4xl font-bold text-gray-800 mb-1">{plan.price}</div>
                  <div className="text-gray-600 mb-4">{plan.period}</div>
                  <p className="text-gray-700">{plan.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <i className={`fas fa-check text-${plan.color}-500 mr-3 mt-1`}></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full py-3 rounded-full font-medium bg-gradient-to-r from-${plan.color}-500 to-${plan.color === 'blue' ? 'cyan' : plan.color === 'amber' ? 'orange' : 'pink'}-500 text-white hover:opacity-90 transition-opacity`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-block bg-white rounded-2xl p-6 shadow-md max-w-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">FAQ - Pertanyaan Umum</h3>
            
            <div className="space-y-4 text-left">
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-bold text-gray-800 mb-2">Apa perbedaan chat AI dan Human?</h4>
                <p className="text-gray-600">AI memberikan respon otomatis berdasarkan data, sedangkan Human memberikan respon empatik dan personal dari pendengar berpengalaman.</p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-bold text-gray-800 mb-2">Bagaimana cara pembayaran?</h4>
                <p className="text-gray-600">Kami mendukung berbagai metode pembayaran: Gopay, OVO, Transfer Bank, Kartu Kredit, dan QRIS.</p>
              </div>
              
              <div className="pb-4">
                <h4 className="font-bold text-gray-800 mb-2">Apakah sesi dengan Human benar-benar anonim?</h4>
                <p className="text-gray-600">Ya, kami tidak meminta data pribadi. Sesi dienkripsi end-to-end dan tidak disimpan setelah 24 jam.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing