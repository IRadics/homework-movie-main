<script setup lang="ts">
const { movies, loading, error } = storeToRefs(useMoviesStore())

onMounted(() => {
  useMoviesStore().fetchMovies()
})
</script>

<template>
  <div class="main-container">
    <h1>Filmek</h1>
    <div v-if="loading" style="display: flex; justify-content: space-between; align-items: center; margin-top: 40vh;">
      <ProgressSpinner />
    </div>
    <div v-else-if="error">
      <Card class="card-error">
        <template #content>
          Hiba: {{ error }}
        </template>
      </Card>
    </div>
    <div v-else style="display: flex; flex-wrap: wrap; gap: 24px; justify-content: center;">
      <NuxtLink v-for="movie in movies" :key="movie.id" style="width: 250px; " :to="`/movie/${movie.id}`" class="revert-hyperlink">
        <Card style="height: 100%;">
          <template #header>
            <img style="width: 100%;" :src="movie.posterUrl">
          </template>
          <template #title>
            <span style="font-weight: bold;">{{ movie.title }}</span>
          </template>
          <template #footer>
            <div style="margin-top: auto;">
              Kiadás éve: {{ formatDate(movie.releaseDate) }}
            </div>
          </template>
        </Card>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="css" scoped>
.card-error {
  border: 1px solid red;
}

:deep(.p-card) {
  .p-card-body {
    height: 100%;
  }

  .p-card-footer {
    margin-top: auto;
  }
}
</style>
