// Direct Gemini API calls untuk single model tanpa fallback
import geminiApi from './geminiApi.js'
import geminiConfig from './geminiConfig.js'

export const geminiDirect = {
  // Generate response untuk curhat
  async generateCurhatResponse(userMessage, topic, options = {}) {
    const {
      useFallback = true,
      maxRetries = 2,
      timeout = 30000
    } = options

    // Check emergency situations first
    const emergencyType = geminiConfig.needsEmergencyResponse(userMessage)
    if (emergencyType) {
      console.log('⚠️ Emergency situation detected:', emergencyType)
      return {
        text: geminiConfig.getEmergencyResponse(emergencyType),
        isEmergency: true,
        model: 'emergency'
      }
    }

    // Build prompt dengan system prompt
    const systemPrompt = geminiConfig.getSystemPrompt(topic)
    const fullPrompt = `${systemPrompt}

Pengguna berkata: "${userMessage}"

Berikan respons yang sesuai dengan instruksi di atas:`

    try {
      // Gunakan geminiApi dengan fallback system
      const result = await geminiApi.generateContent(fullPrompt, maxRetries)
      
      return {
        text: result.text,
        model: result.model,
        isEmergency: false,
        usage: result.usage,
        finishReason: result.finishReason
      }
      
    } catch (error) {
      console.error('❌ All Gemini models failed:', error.message)
      
      if (useFallback) {
        console.log('🔄 Using fallback response')
        const fallbackResponse = geminiConfig.getFallbackResponse(topic, userMessage)
        
        return {
          text: fallbackResponse,
          model: 'fallback',
          isEmergency: false,
          error: error.message
        }
      } else {
        throw error
      }
    }
  },

  // Quick test untuk API key
  async testApiKey() {
    if (!geminiApi.isApiKeyAvailable()) {
      return {
        success: false,
        message: 'API key tidak ditemukan',
        models: []
      }
    }

    const testPrompt = 'Halo, ini adalah test. Jawab dengan "Test berhasil"'
    
    try {
      const result = await geminiApi.generateContent(testPrompt, 1)
      
      return {
        success: true,
        message: 'API key valid',
        model: result.model,
        response: result.text
      }
    } catch (error) {
      return {
        success: false,
        message: `API test gagal: ${error.message}`,
        models: []
      }
    }
  },

  // Get available models status
  getModelsStatus() {
    return geminiApi.getModelStatus()
  },

  // Reset model status
  resetModel(modelName = null) {
    geminiApi.resetModelStatus(modelName)
  },

  // Get API key status
  isApiKeyAvailable() {
    return geminiApi.isApiKeyAvailable()
  },

  // Batch processing untuk multiple messages
  async batchGenerate(messages, topic, options = {}) {
    const {
      delayBetweenCalls = 1000,
      onProgress = null
    } = options

    const results = []
    
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i]
      
      if (onProgress) {
        onProgress(i + 1, messages.length)
      }
      
      try {
        const result = await this.generateCurhatResponse(message, topic, {
          useFallback: true,
          maxRetries: 1
        })
        
        results.push({
          input: message,
          output: result.text,
          model: result.model,
          success: true
        })
      } catch (error) {
        results.push({
          input: message,
          output: geminiConfig.getFallbackResponse(topic, message),
          model: 'fallback',
          success: false,
          error: error.message
        })
      }
      
      // Delay antara calls untuk menghindari rate limit
      if (i < messages.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenCalls))
      }
    }
    
    return results
  }
}

export default geminiDirect