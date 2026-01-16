<script setup lang="ts">
  const cinemasStore = useCinemasStore()

  onMounted(() => {
    cinemasStore.fetchCinemas()
  })

  const marqueeText = computed(() => {
    if (cinemasStore.cinemas.length === 0) return ''
    return cinemasStore.cinemas.map((c) => `${c.name} (${c.city})`).join('     •     ')
  })
</script>

<template>
  <div v-if="cinemasStore.cinemas.length > 0" class="marquee-container">
    <div class="marquee-content">
      <span>{{ marqueeText }}</span>
      <span>{{ marqueeText }}</span>
    </div>
  </div>
</template>

<style scoped>
  .marquee-container {
    background: linear-gradient(90deg, var(--p-primary-600), var(--p-primary-700));
    color: white;
    padding: 0.5rem 0;
    overflow: hidden;
    white-space: nowrap;
  }

  .marquee-content {
    display: inline-flex;
    animation: marquee 30s linear infinite;
  }

  .marquee-content span {
    padding-right: 2rem;
  }

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
</style>
