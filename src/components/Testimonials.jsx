import React, { useState, useEffect } from 'react'

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Rina (22)",
      location: "Jakarta",
      text: "Setelah putus dari pacar selama 3 tahun, saya sangat terpuruk. Nyaritaweh membantu saya melewati masa-masa sulit itu. Pendengarnya sangat memahami perasaan saya.",
      topic: "Percintaan",
      rating: 5,
      avatarColor: "bg-pink-200"
    },
    {
      id: 2,
      name: "Budi (35)",
      location: "Surabaya",
      text: "Stres kerja menumpuk, hampir burn out. Dengan curhat di sini, saya dapat perspektif baru dan cara mengelola stres yang lebih baik. Terima kasih Nyaritaweh!",
      topic: "Pekerjaan",
      rating: 4,
      avatarColor: "bg-blue-200"
    },
    {
      id: 3,
      name: "Sari (28)",
      location: "Bandung",
      text: "Konflik dengan orang tua semakin menjadi. Setelah curhat di sini, saya dapat saran yang membantu memperbaiki komunikasi dengan keluarga. Sangat direkomendasikan!",
      topic: "Keluarga",
      rating: 5,
      avatarColor: "bg-green-200"
    },
    {
      id: 4,
      name: "Doni (19)",
      location: "Yogyakarta",
      text: "Sebagai mahasiswa semester akhir, tekanan skripsi dan masa depan sangat berat. Curhat di sini membuat saya merasa tidak sendirian. Support system yang baik!",
      topic: "Pendidikan",
      rating: 5,
      avatarColor: "bg-amber-200"
    },
    {
      id: 5,
      name: "Maya (25)",
      location: "Bali",
      text: "Saya merasa kesepian setelah pindah kota dan kehilangan teman-teman dekat. Nyaritaweh membantu saya mengatasi kesepian dan menemukan cara berteman baru.",
      topic: "Persahabatan",
      rating: 4,
      avatarColor: "bg-purple-200"
    },
    {
      id: 6,
      name: "Rizki (30)",
      location: "Medan",
      text: "Kecemasan sering menghampiri saya tanpa alasan yang jelas. Dengan curhat di sini, saya belajar teknik mengelola kecemasan yang sangat membantu kehidupan sehari-hari.",
      topic: "Kesehatan Mental",
      rating: 5,
      avatarColor: "bg-indigo-200"
    }
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  return (
    <section id="testimonials" className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Apa Kata Mereka</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ribuan orang telah menemukan ketenangan dengan berbagi cerita di Nyaritaweh.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div 
            className="bg-white rounded-3xl shadow-xl p-8 mb-10 transition-all duration-500 animate__animated animate__fadeIn"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 flex flex-col items-center mb-8 md:mb-0">
                <div className={`w-32 h-32 rounded-full ${testimonials[activeIndex].avatarColor} flex items-center justify-center mb-4`}>
                  <i className="fas fa-user text-5xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{testimonials[activeIndex].name}</h3>
                <p className="text-gray-600">{testimonials[activeIndex].location}</p>
                <div className="mt-2 flex">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i} 
                      className={`fas fa-star ${i < testimonials[activeIndex].rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    ></i>
                  ))}
                </div>
                <span className="mt-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  {testimonials[activeIndex].topic}
                </span>
              </div>
              
              <div className="md:w-2/3 md:pl-10">
                <div className="relative">
                  <i className="fas fa-quote-left text-4xl text-purple-200 absolute -top-4 -left-2"></i>
                  <p className="text-lg text-gray-700 italic pl-8">"{testimonials[activeIndex].text}"</p>
                </div>
                
                <div className="flex justify-center mt-10 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveIndex(index)
                        setIsAutoPlaying(false)
                      }}
                      className={`w-3 h-3 rounded-full transition-all ${index === activeIndex ? 'bg-purple-600 w-8' : 'bg-gray-300'}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 card-hover animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full ${testimonial.avatarColor} flex items-center justify-center mr-4`}>
                    <i className="fas fa-user text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 line-clamp-3">"{testimonial.text}"</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={`fas fa-star ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      ></i>
                    ))}
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {testimonial.topic}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-4 bg-white rounded-full px-6 py-3 shadow-md">
              <div className="text-green-500">
                <i className="fas fa-check-circle text-2xl"></i>
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-800">98% Pengguna Merasa Lega Setelah Curhat</p>
                <p className="text-sm text-gray-600">Berdasarkan survei kepada 2.000 pengguna aktif</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials