// spaceAssistant.js - MODIFIED FOR CURHAT
import { 
    askGeminiDirect, 
    testGeminiConnection, 
    listAllModels,
    getModelStats,
    debugModels,
    findBestModel 
  } from './geminiDirect';
  
  class CurhatAssistant {
    constructor() {
      this.conversationHistory = [];
      this.maxHistory = 10;
      this.isGeminiAvailable = false;
      this.geminiModel = null;
      this.availableModels = [];
      this.currentTopic = 'percintaan';
      this.startTime = Date.now();
      this.initialized = false;
      this.initializationPromise = null;
      
      console.log('💬 Curhat Assistant initializing...');
      
      this.initializationPromise = this.initializeGemini();
    }
    
    async initializeGemini() {
      try {
        console.log('🔧 Testing connection...');
        
        const testResult = await testGeminiConnection();
        this.isGeminiAvailable = testResult.success;
        this.geminiModel = testResult.model;
        
        if (testResult.success) {
          console.log('✅ API READY');
          console.log(`📊 Model: ${this.geminiModel}`);
          console.log(`💰 Estimated RPD: ${testResult.estimatedRPD || '?'}`);
          
          const models = await listAllModels();
          this.availableModels = models.slice(0, 10);
          
        } else {
          console.warn('⚠️ API UNAVAILABLE');
          console.warn(`📊 Reason: ${testResult.message}`);
        }
        
        this.initialized = true;
        console.log('🏁 Curhat Assistant initialized');
        
      } catch (error) {
        console.error('❌ Initialization error:', error);
        this.isGeminiAvailable = false;
        this.initialized = true;
      }
    }
    
    async waitForInitialization() {
      if (!this.initialized && this.initializationPromise) {
        console.log('⏳ Waiting for initialization...');
        await this.initializationPromise;
      }
      return this.initialized;
    }
    
    // Topic-specific prompts untuk curhat
    getTopicPrompt(topic) {
      const prompts = {
        percintaan: `Kamu adalah Curha, asisten curhat AI untuk masalah percintaan.
        Dengarkan dengan empati, validasi perasaan pengguna.
        JANGAN beri saran spesifik tentang hubungan.
        Gunakan bahasa Indonesia yang hangat dan suportif.
        Respons maksimal 3 kalimat.`,
        
        keluarga: `Kamu adalah Curha, asisten curhat AI untuk masalah keluarga.
        Dengarkan dengan sabar tentang dinamika keluarga.
        Validasi perasaan tanpa mengambil pihak.
        Gunakan bahasa Indonesia yang sopan dan memahami.
        Respons maksimal 3 kalimat.`,
        
        pekerjaan: `Kamu adalah Curha, asisten curhat AI untuk masalah pekerjaan.
        Dengarkan tentang stres dan tekanan kerja.
        Validasi perasaan tanpa memberi saran karir spesifik.
        Gunakan bahasa Indonesia profesional namun empatik.
        Respons maksimal 3 kalimat.`,
        
        persahabatan: `Kamu adalah Curha, asisten curhat AI untuk masalah persahabatan.
        Dengarkan tentang konflik atau kesepian dalam pertemanan.
        Validasi pentingnya hubungan sosial.
        Gunakan bahasa Indonesia santai seperti teman bicara.
        Respons maksimal 3 kalimat.`,
        
        pendidikan: `Kamu adalah Curha, asisten curhat AI untuk masalah pendidikan.
        Dengarkan tentang tekanan akademik dan masa depan.
        Validasi stres pendidikan tanpa minimalkan.
        Gunakan bahasa Indonesia suportif untuk pelajar.
        Respons maksimal 3 kalimat.`,
        
        'kesehatan-mental': `Kamu adalah Curha, asisten curhat AI untuk kesehatan mental.
        PERINGATAN: Kamu BUKAN profesional kesehatan.
        Dengarkan dengan sangat hati-hati tentang perasaan sedih/cemas.
        Validasi semua emosi, arahkan ke bantuan profesional jika dibutuhkan.
        Gunakan bahasa Indonesia sangat lembut dan empatik.
        Respons maksimal 3 kalimat.`
      };
      
      return prompts[topic] || prompts.percintaan;
    }
    
    async ask(question, topic = null) {
      if (topic) {
        this.currentTopic = topic;
      }
      
      console.log(`📝 Question (${this.currentTopic}): "${question.substring(0, 50)}..."`);
      
      await this.waitForInitialization();
      
      console.log(`📊 Using model: ${this.geminiModel || 'none'}`);
      
      this.conversationHistory.push({
        question,
        topic: this.currentTopic,
        timestamp: new Date().toISOString(),
        source: null,
        geminiAvailable: this.isGeminiAvailable,
        model: this.geminiModel,
        initialized: this.initialized
      });
      
      if (this.conversationHistory.length > this.maxHistory) {
        this.conversationHistory.shift();
      }
      
      const lowerQ = question.toLowerCase().trim();
      
      // Special commands untuk curhat
      if (lowerQ === 'help' || lowerQ === 'bantuan') {
        return this.getHelpResponse();
      }
      
      if (lowerQ === 'status' || lowerQ === 'mode') {
        return this.getDetailedStatusResponse();
      }
      
      if (lowerQ === 'reset' || lowerQ === 'clear') {
        return this.clearHistoryResponse();
      }
      
      // Try API if available
      if (this.isGeminiAvailable) {
        try {
          console.log(`🎯 Asking ${this.geminiModel}...`);
          const startTime = Date.now();
          
          // BUILD PROMPT KHUSUS CURHAT
          const topicPrompt = this.getTopicPrompt(this.currentTopic);
          const fullPrompt = `${topicPrompt}\n\nPengguna berkata: "${question}"\n\nBerikan respons yang sesuai:`;
          
          const answer = await askGeminiDirect(fullPrompt);
          
          const endTime = Date.now();
          console.log(`✅ Success in ${endTime - startTime}ms`);
          
          if (this.conversationHistory.length > 0) {
            this.conversationHistory[this.conversationHistory.length - 1].source = 'gemini';
            this.conversationHistory[this.conversationHistory.length - 1].responseTime = endTime - startTime;
          }
          
          return answer;
          
        } catch (error) {
          console.error('❌ API failed:', error.message);
          
          this.isGeminiAvailable = false;
          this.geminiModel = null;
          
          if (this.conversationHistory.length > 0) {
            this.conversationHistory[this.conversationHistory.length - 1].source = 'api_error';
            this.conversationHistory[this.conversationHistory.length - 1].error = error.message;
          }
          
          return this.getErrorResponse(question, error);
        }
      }
      
      // API not available - use curhat-specific fallback
      console.log('⚠️ No API available, using curhat fallback');
      
      if (this.conversationHistory.length > 0) {
        this.conversationHistory[this.conversationHistory.length - 1].source = 'fallback';
      }
      
      return this.getCurhatFallbackResponse(question);
    }
    
    getCurhatFallbackResponse(question) {
      const fallbacks = {
        percintaan: [
          "Aku mengerti perasaanmu tentang percintaan ini. Mau ceritakan lebih banyak tentang apa yang kamu rasakan?",
          "Hubungan memang bisa memberikan banyak perasaan campur aduk. Apa yang sedang paling berat untukmu saat ini?",
          "Perasaanmu dalam hubungan ini sangat valid. Terima kasih sudah berbagi dengan aku."
        ],
        keluarga: [
          "Dinamika keluarga memang kompleks. Ceritakan lebih banyak tentang situasinya?",
          "Aku mengerti betapa beratnya masalah keluarga. Kamu bisa cerita dengan aman di sini.",
          "Setiap keluarga punya ceritanya sendiri. Apa yang paling membuatmu khawatir?"
        ],
        pekerjaan: [
          "Stres pekerjaan memang bisa sangat berat. Ceritakan lebih banyak tentang situasi di tempat kerjamu?",
          "Aku mengerti tekanan yang kamu rasakan dalam karir. Apa yang paling membuatmu terbebani?",
          "Setiap orang punya tantangan di pekerjaannya. Kamu tidak sendirian dalam hal ini."
        ]
      };
      
      const topicFallbacks = fallbacks[this.currentTopic] || [
        "Terima kasih sudah berbagi ceritamu. Aku di sini untuk mendengarkan.",
        "Aku mendengarkan dengan penuh perhatian. Ceritakan lebih banyak jika kamu mau.",
        "Setiap perasaan yang kamu alami itu penting. Terima kasih sudah mempercayai aku."
      ];
      
      return topicFallbacks[Math.floor(Math.random() * topicFallbacks.length)];
    }
    
    getErrorResponse(question, error) {
      return `Maaf, terjadi kesalahan teknis: ${error.message}\n\nTapi aku tetap di sini untuk mendengarkan. Mau ceritakan ulang apa yang sedang kamu alami?`;
    }
    
    getDetailedStatusResponse() {
      const status = this.isGeminiAvailable ? '✅ Tersedia' : '❌ Tidak tersedia';
      return `**Status Curhat Assistant**\n\n• AI Assistant: ${status}\n• Model: ${this.geminiModel || 'Tidak ada'}\n• Topik: ${this.currentTopic}\n• Riwayat: ${this.conversationHistory.length} pesan`;
    }
    
    getHelpResponse() {
      return `**Bantuan Curha AI**\n\nAku adalah asisten curhat AI. Kamu bisa cerita tentang:\n• Percintaan & hubungan\n• Masalah keluarga\n• Stres pekerjaan\n• Persahabatan\n• Pendidikan\n• Kesehatan mental\n\nCeritakan apa saja yang sedang kamu alami.`;
    }
    
    clearHistoryResponse() {
      this.conversationHistory = [];
      return `Percakapan baru dimulai. Sekarang topik: **${this.currentTopic}**. Ceritakan apa yang sedang kamu alami.`;
    }
    
    setTopic(topic) {
      const validTopics = ['percintaan', 'keluarga', 'pekerjaan', 'persahabatan', 'pendidikan', 'kesehatan-mental'];
      
      if (validTopics.includes(topic)) {
        this.currentTopic = topic;
        return true;
      }
      return false;
    }
    
    clearHistory() {
      this.conversationHistory = [];
    }
    
    getStatus() {
      return {
        initialized: this.initialized,
        geminiAvailable: this.isGeminiAvailable,
        geminiModel: this.geminiModel,
        currentTopic: this.currentTopic,
        historyLength: this.conversationHistory.length
      };
    }
  }
  
  export const curhatAssistant = new CurhatAssistant();