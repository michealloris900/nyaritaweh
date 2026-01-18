import React, { useState, useEffect, useRef } from 'react';
import { curhatAssistant } from '../utils/curhatAssistant';

function ChatBox({ activeTopic }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [aiStatus, setAiStatus] = useState('Menyiapkan...');
  
  const scrollContainerRef = useRef(null);
  const inputRef = useRef(null);
  const initialLoad = useRef(true); // Tambah ini

  // Warna untuk setiap topik
  const topicColors = {
    percintaan: 'bg-pink-600',
    keluarga: 'bg-blue-600',
    pekerjaan: 'bg-purple-600',
    persahabatan: 'bg-green-600',
    pendidikan: 'bg-amber-600',
    'kesehatan-mental': 'bg-red-600'
  };

  // Gradient untuk header
  const headerGradients = {
    percintaan: 'from-pink-600 to-rose-500',
    keluarga: 'from-blue-600 to-cyan-500',
    pekerjaan: 'from-purple-600 to-indigo-500',
    persahabatan: 'from-green-600 to-emerald-500',
    pendidikan: 'from-amber-600 to-orange-500',
    'kesehatan-mental': 'from-red-600 to-pink-500'
  };

  // Nama topik
  const topicNames = {
    percintaan: 'Percintaan',
    keluarga: 'Keluarga',
    pekerjaan: 'Pekerjaan',
    persahabatan: 'Persahabatan',
    pendidikan: 'Pendidikan',
    'kesehatan-mental': 'Kesehatan Mental'
  };

  // Initialize
  useEffect(() => {
    const init = async () => {
      console.log('🚀 Starting Curhat Assistant...');
      
      // Tunggu assistant siap
      await curhatAssistant.waitForInitialization();
      
      // Set topik
      curhatAssistant.setTopic(activeTopic);
      
      // Cek status
      const status = curhatAssistant.getStatus();
      
      // Tentukan status untuk ditampilkan
      if (status.geminiAvailable) {
        setAiStatus(`✅ AI Active • ${status.geminiModel}`);
      } else {
        setAiStatus('💬 Mode Percakapan Dasar');
      }
      
      setIsReady(true);
      
      // Set pesan pembuka
      const greeting = status.geminiAvailable 
        ? `Halo! Saya Curha, asisten curhat AI. Siap mendengarkan ceritamu tentang ${topicNames[activeTopic]}.`
        : `Halo! Saya Curha. Siap mendengarkan curhatanmu tentang ${topicNames[activeTopic]}.`;
      
      setMessages([{
        id: 1,
        text: greeting,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      
      // TIDAK ADA AUTO-FOCUS DI SINI
    };
    
    init();
  }, [activeTopic]);

  // Update topic jika berubah
  useEffect(() => {
    if (isReady) {
      curhatAssistant.setTopic(activeTopic);
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: `Sekarang kita berbicara tentang ${topicNames[activeTopic]}. Ceritakan apa yang sedang kamu alami.`,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  }, [activeTopic, isReady]);

  // Auto scroll hanya di dalam kotak chat (tanpa menggeser halaman)
  useEffect(() => {
    // Skip scroll pada initial load (greeting message pertama)
    if (initialLoad.current && messages.length <= 1) {
      initialLoad.current = false;
      return;
    }
    // Scroll kontainer pesan ke bagian paling bawah
    const el = scrollContainerRef.current;
    if (el && messages.length > 0) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  // Kirim pesan
  const handleSend = async () => {
    if (!input.trim() || loading || !isReady) return;

    const userMessage = input.trim();
    setInput('');
    
    // Tambah pesan user
    const userMsg = {
      id: Date.now(),
      text: userMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      // Tambah indicator typing
      const typingMsg = {
        id: Date.now() + 1,
        text: '',
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isTyping: true
      };
      
      setMessages(prev => [...prev, typingMsg]);
      
      // Minta response dari assistant
      const response = await curhatAssistant.ask(userMessage, activeTopic);
      
      // Hapus typing indicator
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      
      // Tambah response bot
      const botMsg = {
        id: Date.now() + 2,
        text: response,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botMsg]);
      
    } catch (error) {
      console.error('❌ Chat error:', error);
      
      // Hapus typing indicator
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      
      // Tambah pesan error
      const errorMsg = {
        id: Date.now() + 2,
        text: "Maaf, terjadi kesalahan. Silakan coba lagi.",
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, errorMsg]);
      
    } finally {
      setLoading(false);
      // TIDAK ADA AUTO-FOCUS SETELAH KIRIM
    }
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Clear chat
  const handleClearChat = () => {
    curhatAssistant.clearHistory();
    
    const greeting = `Percakapan baru dimulai. Siap mendengarkan curhatanmu tentang ${topicNames[activeTopic]}.`;
    
    setMessages([{
      id: Date.now(),
      text: greeting,
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    
    // TIDAK ADA AUTO-FOCUS SETELAH CLEAR
  };

  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-blue-50 px-4 py-2 rounded-full mb-4 border border-blue-100">
              <i className="fas fa-robot text-blue-600 mr-2"></i>
              <span className="font-medium text-blue-700">Layanan Curhat Gratis</span>
              {/* <span className="ml-2 text-sm text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">{aiStatus}</span> */}
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Curhat {topicNames[activeTopic]}
            </h2>
            
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ceritakan apa yang sedang kamu alami. Aku di sini untuk mendengarkan dan membantu memberikan solusi.
            </p>
          </div>
          
          {/* Chat Container */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            
            {/* Header Chat */}
            <div className={`bg-gradient-to-r ${headerGradients[activeTopic]} p-5 text-white relative overflow-hidden`}>
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-3 right-3 text-6xl"><i className="fas fa-heart"></i></div>
                <div className="absolute bottom-3 left-3 text-5xl"><i className="fas fa-comment"></i></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm border border-white/30">
                      <i className="fas fa-robot text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Curha AI Assistant</h3>
                      <p className="text-white/90 text-sm">
                        {isReady ? '🟢 Online - Siap mendengarkan' : '🟡 Menyiapkan...'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right hidden sm:block">
                    <div className="text-sm opacity-90">Topik:</div>
                    <div className="font-bold">{topicNames[activeTopic]}</div>
                  </div>
                </div>
                
                <div className="mt-3 text-sm bg-white/10 p-2 rounded-lg backdrop-blur-sm inline-flex items-center">
                  <i className="fas fa-info-circle mr-2"></i>
                  Curha adalah asisten AI, bukan pengganti profesional.
                </div>
              </div>
            </div>
            
            {/* Messages Area */}
            <div ref={scrollContainerRef} className="h-[400px] md:h-[500px] overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-gray-100">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <i className="fas fa-comments text-4xl mb-4"></i>
                  <p className="text-lg">Mulai percakapan dengan mengetik di bawah</p>
                  <p className="text-sm mt-2">Curha siap mendengarkan curhatanmu</p>
                </div>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.isTyping ? (
                      <div className="inline-block bg-white border rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                          </div>
                          <span className="text-sm text-gray-600">Curha sedang mengetik...</span>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className={`inline-block max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                          msg.sender === 'user' 
                            ? `${topicColors[activeTopic]} text-white rounded-br-none` 
                            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm md:text-base whitespace-pre-wrap break-words leading-relaxed">
                          {msg.text}
                        </p>
                        <p className={`text-xs mt-2 ${
                          msg.sender === 'user' ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          {msg.time}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
                          </div>
            
            {/* Input Area */}
            <div className="border-t border-gray-200 bg-white p-4">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ketik curhatanmu di sini... (Shift+Enter untuk baris baru)"
                    disabled={loading || !isReady}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 resize-none text-gray-800 placeholder-gray-500 text-sm md:text-base"
                    rows="2"
                    style={{ minHeight: '60px' }}
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-400 bg-white/80 px-1 rounded">
                    {input.length}/500
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || loading || !isReady}
                    className={`${topicColors[activeTopic]} text-white px-5 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity flex items-center justify-center min-w-[44px] shadow-md`}
                    title="Kirim pesan"
                  >
                    {loading ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      <i className="fas fa-paper-plane"></i>
                    )}
                  </button>
                  
                  <button 
                    onClick={handleClearChat}
                    className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
                    disabled={loading}
                    title="Hapus percakapan"
                  >
                    <i className="fas fa-trash-alt text-sm"></i>
                  </button>
                </div>
              </div>
              
              <div className="mt-3 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-2">
                <div className="flex items-center">
                  <i className="fas fa-lock mr-1"></i>
                  <span>Percakapan aman dan anonim</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="hidden sm:inline">•</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${isReady ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {isReady ? '✅ Siap digunakan' : '⏳ Menyiapkan...'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Info Footer */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <div className="inline-flex items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
              <i className="fas fa-info-circle mr-2 text-blue-500"></i>
              <p>
                Curha adalah asisten AI, bukan pengganti profesional. 
                <span className="block sm:inline"> Untuk bantuan mendesak, hubungi <span className="font-semibold text-red-600">119</span>.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChatBox;