import nodeProcess from 'node:process'
import Aura from '@primeuix/themes/aura'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiUrl: nodeProcess.env.NUXT_PUBLIC_API_URL || 'http://localhost:3001',
    },
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  modules: ['@nuxt/eslint', '@primevue/nuxt-module', '@pinia/nuxt'],

  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
})
