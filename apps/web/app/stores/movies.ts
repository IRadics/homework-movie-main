import type { AddMovieInterestDto, Movie, MovieDetails } from '@repo/types'
import { defineStore } from 'pinia'

export const useMoviesStore = defineStore('movies', () => {
  const config = useRuntimeConfig()

  const movies = ref<Movie[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchMovies() {
    loading.value = true
    error.value = null
    try {
      movies.value = await $fetch<Movie[]>(`${config.public.apiUrl}/movies/popular`)
    }
    catch (e) {
      error.value = 'Hiba lépett fel a filmek betöltése közben'
      console.error(e)
    }
    finally {
      loading.value = false
    }
  }

  async function getMovieById(id: number): Promise<MovieDetails | undefined> {
    return await $fetch<MovieDetails>(`${config.public.apiUrl}/movies/${id}`)
  }

  async function addInterest(data: AddMovieInterestDto) {
    const { movieId, ...payload } = data

    return await $fetch<void>(`${config.public.apiUrl}/movies/${movieId}/interest`, {
      method: 'POST',
      body: payload,
    })
  }

  return {
    movies,
    loading,
    error,
    fetchMovies,
    getMovieById,
    addInterest,
  }
})
