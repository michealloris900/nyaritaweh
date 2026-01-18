import { askGeminiDirect, testGeminiConnection } from './geminiDirect';

class CurhatAssistant {
  constructor() {
    this.isGeminiAvailable = false;
    this.geminiModel = null;
    this.currentTopic = 'percintaan';
    this.initialized = false;
    
    console.log('💬 Curhat Assistant created');
    this.initialize();
  }
  
  async initialize() {
    try {
      const testResult = await testGeminiConnection();
      this.isGeminiAvailable = testResult.success;
      this.geminiModel = testResult.model;
      this.initialized = true;
    } catch (error) {
      console.error('❌ Initialization error:', error);
      this.initialized = true;
    }
  }
  
  async waitForInitialization() {
    if (!this.initialized) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    return true;
  }
  
  async ask(question, topic = null) {
    if (topic) {
      this.currentTopic = topic;
    }
    
    console.log(`💬 Topic: ${this.currentTopic}, Question: "${question}"`);
    
    // HANYA PAKAI AI - TAPI DENGAN PROMPT YANG CERDAS
    if (this.isGeminiAvailable) {
      try {
        const prompt = this.buildSmartPrompt(question, topic);
        console.log('📤 Smart prompt sent');
        
        const response = await askGeminiDirect(prompt);
        console.log('📥 AI Response received');
        
        return this.cleanResponse(response);
        
      } catch (error) {
        console.error('❌ AI Error:', error.message);
        return this.getNaturalFallback(question, topic);
      }
    }
    
    // FALLBACK NATURAL
    return this.getNaturalFallback(question, topic);
  }
  
  buildSmartPrompt(userMessage, topic) {
    // PROMPT YANG CERDAS - BIARKAN AI ANALISA SENDIRI
    return `Kamu adalah Curha, asisten curhat yang bijak.

Konteks percakapan: User sedang curhat tentang ${this.getTopicDescription(topic)}.

Pesan user: "${userMessage}"

INSTRUKSI UNTUK CURHA:
1. ANALISIS: Apa inti masalah atau tujuan dari pesan user?
2. RESPONS: Berikan tanggapan yang:
   - Spesifik terhadap konteks pesan user
   - Memberikan insight atau perspektif yang relevan
   - Jika user meminta saran, berikan saran praktis
   - Jika user hanya curhat, berikan validasi dan dukungan
3. FORMAT: 
   - Bahasa Indonesia natural seperti bicara dengan teman
   - 3-5 kalimat maksimal
   - Jangan terlalu formal
   - Boleh gunakan poin-poin jika perlu
4. JANGAN:
   - Bertanya "mengapa" (itu seperti interogasi)
   - Hanya validasi lalu tanya balik
   - Memberikan respons generik
   - Mengulang kata-kata user

CONTOH RESPONS CERDAS:
User: "Aku ingin menjadi S3"
Curha: "Menargetkan gelar doktor itu ambisi yang bagus! Pertama, tentukan bidang riset yang benar-benar kamu minati. Kedua, cari universitas dan pembimbing yang tepat. Ketiga, persiapkan proposal dan funding. Apa bidang studi yang kamu impikan?"

User: "Keluarga tidak setuju dengan pacar saya"
Curha: "Konflik antara cinta dan keluarga memang berat. Coba ajak keluarga diskusi terbuka: apa spesifik kekhawatiran mereka? Seringkali dengan komunikasi yang baik, bisa ditemukan titik temu. Bagaimana respons pacarmu tentang ini?"

SEKARANG ANALISIS PESAN USER DI ATAS DAN BERIKAN RESPONS YANG CERDAS:
Curha:`;
  }
  
  getTopicDescription(topic) {
    const descriptions = {
      'pendidikan': 'pendidikan, studi, sekolah, atau kuliah',
      'percintaan': 'hubungan percintaan atau asmara',
      'pekerjaan': 'pekerjaan, karir, atau bisnis',
      'keluarga': 'masalah keluarga atau hubungan kekeluargaan',
      'persahabatan': 'pertemanan atau persahabatan',
      'kesehatan-mental': 'kesehatan mental atau kesejahteraan emosional'
    };
    return descriptions[topic] || 'masalah pribadi';
  }
  
  cleanResponse(text) {
    let cleaned = text.trim();
    
    // Hapus prefix yang tidak perlu
    const unwantedPrefixes = ['Curha:', 'AI:', 'Asisten:', 'Bot:', '"'];
    for (const prefix of unwantedPrefixes) {
      if (cleaned.startsWith(prefix)) {
        cleaned = cleaned.substring(prefix.length).trim();
      }
    }
    
    // Hapus tanda kutip di akhir
    if (cleaned.endsWith('"')) {
      cleaned = cleaned.substring(0, cleaned.length - 1).trim();
    }
    
    // Pastikan tidak kosong
    if (cleaned.length < 15) {
      return this.getNaturalFallback("", this.currentTopic);
    }
    
    return cleaned;
  }
  
  getNaturalFallback(question, topic) {
    // Fallback yang natural berdasarkan konteks
    const q = question.toLowerCase();
    
    // Deteksi tipe pertanyaan
    if (q.includes('?') || q.includes('bagaimana') || q.includes('caranya')) {
      // User minta solusi/saran
      return `Untuk ${this.getTopicDescription(topic)}, coba identifikasi dulu akar masalahnya. Apa yang sudah kamu coba sejauh ini? Dengan informasi lebih detail, aku bisa bantu berikan saran yang lebih spesifik.`;
    } 
    else if (q.includes('saya') || q.includes('aku') || q.includes('ingin') || q.includes('ingin')) {
      // User express keinginan/goal
      return `${this.getGoalResponse(topic)} Langkah pertama biasanya memahami dengan jelas apa yang ingin dicapai dan apa tantangannya. Bisa ceritakan lebih detail?`;
    }
    else {
      // User curhat biasa
      return `Terima kasih sudah berbagi cerita tentang ${this.getTopicDescription(topic)}. Aku di sini untuk mendengarkan. Ada hal spesifik yang ingin kamu bahas lebih dalam?`;
    }
  }
  
  getGoalResponse(topic) {
    const responses = {
      'pendidikan': 'Menetapkan tujuan pendidikan itu penting.',
      'percintaan': 'Memahami keinginan dalam hubungan itu langkah awal yang baik.',
      'pekerjaan': 'Memiliki target karir membantu arah perkembangan.',
      'keluarga': 'Ingin memperbaiki hubungan keluarga itu niat yang bagus.',
      'persahabatan': 'Memperhatikan kualitas pertemanan itu penting.',
      'kesehatan-mental': 'Peduli pada kesehatan mental diri sendiri itu langkah awal penyembuhan.'
    };
    return responses[topic] || 'Memiliki tujuan jelas itu baik.';
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
    console.log('🧹 Chat history cleared');
  }
  
  getStatus() {
    return {
      initialized: this.initialized,
      geminiAvailable: this.isGeminiAvailable,
      geminiModel: this.geminiModel || 'Not connected',
      currentTopic: this.currentTopic
    };
  }
}

export const curhatAssistant = new CurhatAssistant();
export default curhatAssistant;