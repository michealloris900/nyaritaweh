import React, { useState, useEffect } from 'react'

function GeminiConfig({ onApiKeySet, isOpen, onClose }) {
  const [apiKey, setApiKey] = useState('')
  const [testResult, setTestResult] = useState(null)
  const [isTesting, setIsTesting] = useState(false)

  useEffect(() => {
    // Load saved API key
    const savedKey = localStorage.getItem('curhatkita_gemini_key')
    if (savedKey) {
      setApiKey(savedKey)
    }
  }, [])

  const testApiKey = async () => {
    if (!apiKey.trim()) {
      setTestResult({ success: false, message: 'API key tidak boleh kosong' })
      return
    }

    setIsTesting(true)
    setTestResult(null)

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "Halo, tes koneksi."
            }]
          }]
        })
      })

      if (response.ok) {
        setTestResult({ success: true, message: 'API key valid! Gemini AI siap digunakan.' })
        localStorage.setItem('curhatkita_gemini_key', apiKey)
        if (onApiKeySet) onApiKeySet(apiKey)
      } else {
        setTestResult({ success: false, message: 'API key tidak valid' })
      }
    } catch (error) {
      setTestResult({ success: false, message: 'Error: ' + error.message })
    } finally {
      setIsTesting(false)
    }
  }

  const clearApiKey = () => {
    setApiKey('')
    setTestResult(null)
    localStorage.removeItem('curhatkita_gemini_key')
    if (onApiKeySet) onApiKeySet('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate__animated animate__fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate__animated animate__zoomIn">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Konfigurasi Gemini AI</h3>
              <p className="text-white/80 text-sm">Masukkan API key untuk chatbot yang lebih cerdas</p>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gemini API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Masukkan API key Gemini AI"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-2">
                Dapatkan API key gratis dari{' '}
                <a 
                  href="https://makersuite.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google AI Studio
                </a>
              </p>
            </div>

            {testResult && (
              <div className={`p-4 rounded-lg ${testResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                <div className="flex items-center">
                  <i className={`fas fa-${testResult.success ? 'check-circle' : 'exclamation-circle'} mr-2`}></i>
                  <span>{testResult.message}</span>
                </div>
              </div>
            )}

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2">Cara Mendapatkan API Key:</h4>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal pl-4">
                <li>Kunjungi <a href="https://makersuite.google.com/app/apikey" className="text-blue-600 hover:underline">Google AI Studio</a></li>
                <li>Login dengan akun Google</li>
                <li>Klik "Get API Key"</li>
                <li>Pilih "Create API Key"</li>
                <li>Copy API key dan paste di sini</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6">
          <div className="flex justify-between space-x-4">
            <button 
              onClick={clearApiKey}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
            <div className="flex space-x-3">
              <button 
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors"
              >
                Tutup
              </button>
              <button 
                onClick={testApiKey}
                disabled={isTesting || !apiKey.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isTesting ? (
                  <span className="flex items-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Testing...
                  </span>
                ) : (
                  'Test & Simpan'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeminiConfig