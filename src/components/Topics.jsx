import React from 'react'

function Topics({ activeTopic, setActiveTopic }) {
  const topics = [
    {
      id: 'percintaan',
      title: 'Percintaan',
      icon: 'fa-heart',
      color: 'from-red-400 to-pink-500',
      description: 'Masalah hubungan, putus cinta, atau kebingungan perasaan',
      count: '4.500+'
    },
    {
      id: 'keluarga',
      title: 'Keluarga',
      icon: 'fa-home',
      color: 'from-blue-400 to-cyan-500',
      description: 'Konflik keluarga, hubungan dengan orang tua, atau masalah rumah tangga',
      count: '2.300+'
    },
    {
      id: 'pekerjaan',
      title: 'Pekerjaan & Karir',
      icon: 'fa-briefcase',
      color: 'from-green-400 to-emerald-500',
      description: 'Stres pekerjaan, konflik dengan rekan, atau kebingungan karir',
      count: '1.800+'
    },
    {
      id: 'persahabatan',
      title: 'Persahabatan',
      icon: 'fa-user-friends',
      color: 'from-purple-400 to-violet-500',
      description: 'Masalah dengan teman, kesepian, atau perubahan hubungan pertemanan',
      count: '1.200+'
    },
    {
      id: 'pendidikan',
      title: 'Pendidikan',
      icon: 'fa-graduation-cap',
      color: 'from-amber-400 to-orange-500',
      description: 'Stres akademik, tekanan nilai, atau kebingungan masa depan',
      count: '1.500+'
    },
    {
      id: 'kesehatan-mental',
      title: 'Kesehatan Mental',
      icon: 'fa-brain',
      color: 'from-indigo-400 to-blue-500',
      description: 'Kecemasan, stres, depresi, atau masalah kesehatan mental lainnya',
      count: '1.000+'
    }
  ]

  return (
    <section id="topics" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate__animated animate__fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Topik Curhat</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pilih topik yang sesuai dengan masalahmu. Semua curhat akan ditangani dengan penuh empati dan kerahasiaan.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <div 
              key={topic.id}
              className={`
                card-hover bg-white rounded-2xl p-6 cursor-pointer border-2 
                ${activeTopic === topic.id ? 'border-purple-300 shadow-xl' : 'border-transparent'} 
                animate__animated animate__fadeIn
                ${activeTopic === topic.id ? 'animate__pulse' : ''}
              `}
              onClick={() => setActiveTopic(topic.id)}
            >
              <div className="flex items-start mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mr-4`}>
                  <i className={`fas ${topic.icon} text-white text-2xl`}></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-500">{topic.count} curhat</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{topic.description}</p>
              
              <div className="flex justify-between items-center">
                <span className={`px-4 py-1 rounded-full text-sm font-medium ${activeTopic === topic.id ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                  {activeTopic === topic.id ? 'Dipilih' : 'Pilih topik'}
                </span>
                <i className={`fas fa-chevron-right ${activeTopic === topic.id ? 'text-purple-600' : 'text-gray-400'}`}></i>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-full p-1">
            <div 
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTopic === 'percintaan' ? 'bg-white text-purple-700 shadow-md' : 'text-gray-600'} cursor-pointer`} 
              onClick={() => setActiveTopic('percintaan')}
            >
              <i className="fas fa-heart mr-2"></i> Percintaan
            </div>
            <div 
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTopic === 'keluarga' ? 'bg-white text-purple-700 shadow-md' : 'text-gray-600'} cursor-pointer`} 
              onClick={() => setActiveTopic('keluarga')}
            >
              <i className="fas fa-home mr-2"></i> Keluarga
            </div>
            <div 
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTopic === 'pekerjaan' ? 'bg-white text-purple-700 shadow-md' : 'text-gray-600'} cursor-pointer`} 
              onClick={() => setActiveTopic('pekerjaan')}
            >
              <i className="fas fa-briefcase mr-2"></i> Pekerjaan
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Topics