import type { Cinema } from '@repo/types'
import { defineStore } from 'pinia'

export const useCinemasStore = defineStore('cinemas', () => {
  const config = useRuntimeConfig()

  const cinemas = ref<Cinema[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchCinemas() {
    loading.value = true
    error.value = null
    try {
      cinemas.value = await $fetch<Cinema[]>(`${config.public.apiUrl}/cinemas`)
    } catch (e) {
      error.value = 'Nem sikerült betölteni a mozikat'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  function getCinemaById(id: string): Cinema | undefined {
    return cinemas.value.find((c) => c.id === id)
  }

  return {
    cinemas,
    loading,
    error,
    fetchCinemas,
    getCinemaById,
  }
})
