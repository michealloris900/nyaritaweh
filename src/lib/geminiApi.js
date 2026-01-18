// Gemini API Core Handler dengan multiple models fallback
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

export const geminiApi = {
  // Configuration untuk berbagai model
  models: [
    {
      name: 'gemini-1.5-flash',
      displayName: 'Gemini Flash',
      priority: 1,
      endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
      config: {
        temperature: 0.7,
        maxOutputTokens: 2048,
        topP: 0.95,
        topK: 40
      }
    },
    {
      name: 'gemini-1.5-pro',
      displayName: 'Gemini Pro',
      priority: 2,
      endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent',
      config: {
        temperature: 0.7,
        maxOutputTokens: 2048,
        topP: 0.95,
        topK: 40
      }
    },
    {
      name: 'gemma-2-9b-it',
      displayName: 'Gemma 2 9B',
      priority: 3,
      endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemma-2-9b-it:generateContent',
      config: {
        temperature: 0.7,
        maxOutputTokens: 2048,
        topP: 0.95,
        topK: 40
      }
    },
    {
      name: 'gemini-pro',
      displayName: 'Gemini Pro Legacy',
      priority: 4,
      endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      config: {
        temperature: 0.7,
        maxOutputTokens: 2048,
        topP: 0.95,
        topK: 40
      }
    }
  ],

  // Safety settings untuk semua model
  safetySettings: [
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE"
    }
  ],

  // Status tracking untuk setiap model
  modelStatus: {},

  // Initialize model status
  init() {
    this.models.forEach(model => {
      this.modelStatus[model.name] = {
        available: true,
        lastError: null,
        errorCount: 0,
        lastUsed: null,
        successCount: 0
      }
    })
  },

  // Get best available model berdasarkan priority dan status
  getBestModel() {
    const sortedModels = [...this.models].sort((a, b) => a.priority - b.priority)
    
    for (const model of sortedModels) {
      const status = this.modelStatus[model.name]
      if (status && status.available) {
        return model
      }
    }
    
    // Jika semua model tidak available, return model pertama
    return sortedModels[0]
  },

  // Mark model sebagai unavailable
  markModelUnavailable(modelName, error) {
    if (this.modelStatus[modelName]) {
      this.modelStatus[modelName].available = false
      this.modelStatus[modelName].lastError = error
      this.modelStatus[modelName].errorCount++
      this.modelStatus[modelName].lastUsed = new Date()
      
      console.warn(`⚠️ Model ${modelName} marked as unavailable:`, error.message)
      
      // Coba reset setelah 5 menit
      setTimeout(() => {
        this.modelStatus[modelName].available = true
        console.log(`🔄 Model ${modelName} reset to available`)
      }, 5 * 60 * 1000)
    }
  },

  // Mark model sebagai success
  markModelSuccess(modelName) {
    if (this.modelStatus[modelName]) {
      this.modelStatus[modelName].successCount++
      this.modelStatus[modelName].lastUsed = new Date()
      this.modelStatus[modelName].errorCount = 0
    }
  },

  // Generate content dengan fallback system
  async generateContent(prompt, retryCount = 0) {
    if (!API_KEY) {
      throw new Error('API key tidak ditemukan. Pastikan VITE_GEMINI_API_KEY diatur di .env.local')
    }

    // Initialize jika belum
    if (Object.keys(this.modelStatus).length === 0) {
      this.init()
    }

    const maxRetries = 3
    let lastError = null

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const model = this.getBestModel()
      console.log(`🔄 Attempt ${attempt + 1}: Menggunakan ${model.displayName}...`)

      try {
        const response = await fetch(`${model.endpoint}?key=${API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }],
            generationConfig: model.config,
            safetySettings: this.safetySettings
          })
        })

        if (response.ok) {
          const data = await response.json()
          
          if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            this.markModelSuccess(model.name)
            
            const result = {
              text: data.candidates[0].content.parts[0].text,
              model: model.displayName,
              finishReason: data.candidates[0].finishReason,
              usage: {
                promptTokens: data.usageMetadata?.promptTokenCount,
                candidatesTokens: data.usageMetadata?.candidatesTokenCount,
                totalTokens: data.usageMetadata?.totalTokenCount
              }
            }
            
            console.log(`✅ Success dengan ${model.displayName}`)
            return result
          } else {
            throw new Error('Format respons tidak valid')
          }
        } else {
          const errorText = await response.text()
          const error = new Error(`HTTP ${response.status}: ${errorText}`)
          this.markModelUnavailable(model.name, error)
          lastError = error
          
          // Jika quota exceeded, langsung coba model berikutnya
          if (response.status === 429 || errorText.includes('quota')) {
            console.log(`⏭️ Quota exceeded untuk ${model.displayName}, mencoba model lain...`)
            continue
          }
        }
      } catch (error) {
        console.error(`❌ Error dengan ${model.displayName}:`, error.message)
        this.markModelUnavailable(model.name, error)
        lastError = error
        
        // Tunggu sebentar sebelum retry
        if (attempt < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)))
        }
      }
    }

    // Jika semua retry gagal
    throw lastError || new Error('Semua model gagal merespons')
  },

  // Get model status untuk monitoring
  getModelStatus() {
    return this.modelStatus
  },

  // Force reset model status
  resetModelStatus(modelName = null) {
    if (modelName) {
      if (this.modelStatus[modelName]) {
        this.modelStatus[modelName].available = true
        this.modelStatus[modelName].errorCount = 0
        this.modelStatus[modelName].lastError = null
      }
    } else {
      this.init()
    }
  },

  // Check API key availability
  isApiKeyAvailable() {
    return !!API_KEY
  }
}

// Initialize
geminiApi.init()

export default geminiApi