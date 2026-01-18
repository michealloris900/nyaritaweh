import React, { useEffect } from 'react'

function PaymentSuccessModal({ isOpen, onClose, planDetails }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate__animated animate__fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate__animated animate__zoomIn">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white rounded-t-2xl">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-check text-4xl"></i>
            </div>
            <h3 className="text-2xl font-bold">Pembayaran Berhasil!</h3>
            <p className="text-white/80 text-center mt-2">Anda sekarang dapat chat dengan pendengar manusia</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
              <div>
                <h4 className="font-bold text-gray-800">Paket Premium</h4>
                <p className="text-sm text-gray-600">Chat dengan Human - 15 menit</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">Rp 25.000</div>
                <div className="text-sm text-gray-600">berhasil dibayar</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">ID Transaksi</span>
                <span className="font-mono font-bold">TRX-{Date.now().toString().slice(-8)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Metode Pembayaran</span>
                <span className="font-medium">Gopay</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tanggal</span>
                <span className="font-medium">{new Date().toLocaleDateString('id-ID')}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="font-bold text-gray-800 mb-2">Instruksi:</h4>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Anda akan dihubungkan dengan pendengar dalam 1-2 menit</li>
                <li>• Siapkan diri untuk curhat dengan nyaman</li>
                <li>• Sesi akan berlangsung selama 15 menit</li>
                <li>• Anda bisa memperpanjang sesi jika diperlukan</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 p-6">
          <button 
            onClick={onClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Mulai Chat dengan Human
          </button>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            Halaman ini akan tertutup otomatis dalam 5 detik
          </p>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccessModal