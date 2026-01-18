<script setup lang="ts">
import type { MovieDetails } from '@repo/types'

const movieId = Number(useRoute().params.id)

if (!movieId || Number.isNaN(movieId)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Film nem található',
    fatal: true,
  })
}

const loading = ref(false)
const movie = ref<MovieDetails | null>(null)

onMounted(async () => {
  try {
    loading.value = true
    movie.value = await useMoviesStore().getMovieById(movieId) ?? null
    if (!movie.value) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Film nem található',
        fatal: true,
      })
    }
  }
  catch (e) {
    console.error(e)
    throw createError({
      statusCode: 404,
      fatal: true,
    })
  }
  finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="main-container">
    <div v-if="loading" style="display: flex; justify-content: space-between; align-items: center; margin-top: 40vh;">
      <ProgressSpinner />
    </div>

    <div v-if="movie" style="display: flex; gap: 24px; flex-direction: column; ">
      <Card>
        <template #title>
          <h1 style="margin-top: 0;">
            {{ movie.title }}
          </h1>
        </template>
        <template #content>
          <div style="display: flex; gap: 24px; align-items: start; flex-wrap: wrap;">
            <div style="margin: 0 auto;">
              <img :src="movie.posterUrl" style="width: 200px; object-fit: contain;">
            </div>
            <div style="flex-grow: 1; width: 50%;">
              <p style="font-weight: bold; ">
                Megjelenés Dátuma: {{ formatDate(movie.releaseDate) }}
              </p>
              <p style="line-height: 1.5rem;">
                {{ movie.overview }}
              </p>
            </div>
          </div>
        </template>
      </Card>
      <Card>
        <template #title>
          <h2 style="margin: 0 auto 24px; width: fit-content;">
            Érdeklődj jegyekről
          </h2>
        </template>
        <template #content>
          <MovieInterestForm :movie-id="movieId" />
        </template>
      </Card>
    </div>
  </div>
</template>
