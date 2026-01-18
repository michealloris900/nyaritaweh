// src/utils/geminiService.js - FIXED VERSION
import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    console.log('🔧 Initializing Gemini Service...');
    console.log('🔑 API Key exists:', !!this.apiKey);
    console.log('Key preview:', this.apiKey ? `${this.apiKey.substring(0, 10)}...` : 'No key');
    
    if (!this.apiKey || this.apiKey.trim() === '') {
      console.error('❌ VITE_GEMINI_API_KEY tidak ditemukan atau kosong di .env.local');
      console.log('💡 Pastikan file .env.local berisi:');
      console.log('   VITE_GEMINI_API_KEY=your_actual_key_here');
      this.model = null;
      this.isAvailable = false;
      return;
    }
    
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = null;
    this.isAvailable = false;
    this.modelName = null;
    
    // Initialize async
    this.initialize();
  }
  
  async initialize() {
    try {
      console.log('🔍 Getting available models...');
      
      // Pertama, coba dapatkan model yang tersedia
      const availableModels = await this.getAvailableModels();
      
      if (availableModels.length === 0) {
        throw new Error('No models available from API');
      }
      
      console.log(`📊 Found ${availableModels.length} models`);
      
      // Cari model yang support generateContent
      const supportedModels = availableModels.filter(model => 
        model.supportedGenerationMethods?.includes('generateContent')
      );
      
      console.log(`✅ ${supportedModels.length} models support generateContent`);
      
      if (supportedModels.length === 0) {
        throw new Error('No models support generateContent');
      }
      
      // Coba model yang paling baru dulu
      const modelOrder = [
        'gemini-2.0-flash-exp',     // Experimental terbaru
        'gemini-1.5-flash',         // Flash model
        'gemini-1.5-pro',           // Pro model
        'gemini-1.0-pro',           // Legacy
        'gemma-2-27b-it',           // Gemma model
        'gemma-2-9b-it'             // Gemma kecil
      ];
      
      let selectedModel = null;
      
      for (const modelType of modelOrder) {
        // Cari model dengan pattern
        const foundModel = supportedModels.find(m => 
          m.name.toLowerCase().includes(modelType.toLowerCase())
        );
        
        if (foundModel) {
          const shortName = foundModel.name.replace('models/', '');
          console.log(`🎯 Trying model: ${shortName}`);
          
          try {
            this.model = this.genAI.getGenerativeModel({ 
              model: shortName,
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
                topP: 0.8,
                topK: 40,
              }
            });
            
            // Test connection dengan prompt kecil
            await this.model.generateContent({ contents: [{ parts: [{ text: 'Test' }] }] });
            
            this.modelName = shortName;
            this.isAvailable = true;
            console.log(`✅ Successfully connected to ${shortName}`);
            break;
            
          } catch (modelError) {
            console.log(`⚠️ Model ${shortName} failed: ${modelError.message}`);
            continue;
          }
        }
      }
      
      // Jika tidak ada yang berhasil, coba model pertama yang ada
      if (!this.isAvailable && supportedModels.length > 0) {
        const firstModel = supportedModels[0];
        const shortName = firstModel.name.replace('models/', '');
        
        console.log(`🔄 Fallback to first available model: ${shortName}`);
        
        try {
          this.model = this.genAI.getGenerativeModel({ 
            model: shortName,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1000,
            }
          });
          
          await this.model.generateContent({ contents: [{ parts: [{ text: 'Test' }] }] });
          
          this.modelName = shortName;
          this.isAvailable = true;
          console.log(`✅ Connected to ${shortName} (fallback)`);
          
        } catch (error) {
          console.error(`❌ All models failed: ${error.message}`);
          this.isAvailable = false;
        }
      }
      
    } catch (error) {
      console.error('❌ Initialization error:', error.message);
      this.isAvailable = false;
    }
  }
  
  async getAvailableModels() {
    try {
      // Menggunakan fetch langsung untuk mendapatkan daftar model
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${this.apiKey}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Failed to get models: HTTP ${response.status}`, errorText);
        return [];
      }
      
      const data = await response.json();
      return data.models || [];
      
    } catch (error) {
      console.error('❌ Error fetching models:', error.message);
      return [];
    }
  }
  
  async ask(question, topic = 'percintaan') {
    if (!this.isAvailable || !this.model) {
      throw new Error('Gemini service tidak tersedia');
    }
    
    // System prompt untuk curhat
    const systemPrompts = {
      percintaan: `Kamu adalah Curha, asisten curhat AI khusus untuk masalah percintaan dan hubungan. 
      Dengarkan dengan empati, validasi perasaan, dan berikan dukungan emosional. 
      JANGAN beri saran spesifik atau diagnosis. Gunakan bahasa Indonesia yang hangat.
      Jawab dalam 2-3 kalimat maksimal.`,
      
      keluarga: `Kamu adalah Curha, asisten curhat AI untuk masalah keluarga. 
      Dengarkan dengan sabar, validasi perasaan kompleks dalam hubungan keluarga. 
      Bersikaplah netral dan tidak memihak. Gunakan bahasa Indonesia yang sopan.
      Jawab dalam 2-3 kalimat maksimal.`,
      
      pekerjaan: `Kamu adalah Curha, asisten curhat AI untuk masalah pekerjaan dan karir. 
      Dengarkan tentang stres pekerjaan dengan pengertian. 
      Validasi tekanan profesional tanpa memberikan nasihat karir spesifik.
      Jawab dalam 2-3 kalimat maksimal.`,
      
      persahabatan: `Kamu adalah Curha, asisten curhat AI untuk masalah persahabatan. 
      Dengarkan tentang dinamika pertemanan dengan empati.
      Validasi perasaan tanpa menghakimi teman-teman pengguna.
      Jawab dalam 2-3 kalimat maksimal.`,
      
      pendidikan: `Kamu adalah Curha, asisten curhat AI untuk masalah pendidikan. 
      Dengarkan tentang tekanan akademik dengan pengertian.
      Validasi stres pendidikan tanpa memberikan saran akademik spesifik.
      Jawab dalam 2-3 kalimat maksimal.`,
      
      'kesehatan-mental': `Kamu adalah Curha, asisten curhat AI untuk kesehatan mental. 
      INGAT: Kamu BUKAN psikolog atau profesional kesehatan.
      Dengarkan dengan sangat hati-hati, validasi semua emosi.
      Jika mendeteksi situasi darurat, arahkan ke hotline profesional.
      Jawab dalam 2-3 kalimat maksimal.`
    };
    
    const systemPrompt = systemPrompts[topic] || systemPrompts.percintaan;
    
    // Gabungkan prompt
    const prompt = `${systemPrompt}\n\nPengguna: ${question}\n\nCurha:`;
    
    try {
      console.log(`📤 Sending to ${this.modelName} (topic: ${topic})...`);
      
      const result = await this.model.generateContent({ 
        contents: [{ parts: [{ text: prompt }] }] 
      });
      
      const response = await result.response;
      const text = response.text();
      
      console.log('✅ Response received');
      return text;
      
    } catch (error) {
      console.error('❌ Gemini API error:', error.message);
      
      // Fallback responses berdasarkan topik
      const fallbackResponses = {
        percintaan: "Aku mengerti perasaanmu tentang percintaan ini. Mau ceritakan lebih banyak tentang apa yang kamu rasakan?",
        keluarga: "Dinamika keluarga memang bisa kompleks. Terima kasih sudah berbagi ceritamu.",
        pekerjaan: "Stres pekerjaan memang berat. Aku di sini untuk mendengarkan.",
        persahabatan: "Hubungan pertemanan punya dinamikanya sendiri. Ceritakan lebih banyak ya.",
        pendidikan: "Tekanan akademik bisa sangat melelahkan. Aku siap mendengarkan ceritamu.",
        'kesehatan-mental': "Aku mendengarkan dengan penuh perhatian. Setiap perasaanmu itu valid."
      };
      
      return fallbackResponses[topic] || "Terima kasih sudah berbagi ceritamu. Aku di sini untuk mendengarkan.";
    }
  }
  
  getStatus() {
    return {
      isAvailable: this.isAvailable,
      hasApiKey: !!this.apiKey,
      model: this.modelName || 'None',
      keyPreview: this.apiKey ? `${this.apiKey.substring(0, 5)}...${this.apiKey.substring(this.apiKey.length - 5)}` : 'No key'
    };
  }
  
  // Method untuk manual testing
  async testConnection() {
    try {
      if (!this.model) {
        return { success: false, message: 'Model not initialized' };
      }
      
      const result = await this.model.generateContent({ 
        contents: [{ parts: [{ text: 'Hello, are you working?' }] }] 
      });
      
      const response = await result.response;
      const text = response.text();
      
      return {
        success: true,
        message: 'Connection successful',
        model: this.modelName,
        response: text
      };
      
    } catch (error) {
      return {
        success: false,
        message: `Connection failed: ${error.message}`,
        model: this.modelName
      };
    }
  }
}

// Export singleton instance
export const geminiService = new GeminiService();
export default geminiService;