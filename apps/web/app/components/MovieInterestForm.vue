<script setup lang="ts">
import type { FormSubmitEvent } from '@primevue/forms'
import type { AddMovieInterestDto } from '@repo/types'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { FetchError } from 'ofetch'
import { z } from 'zod'

const { movieId } = defineProps({
  movieId: {
    type: Number,
    required: true,
  },
})

const initialValue: Record<keyof AddMovieInterestDto, null> = {
  movieId: movieId as unknown as null,
  email: null,
  ticketCount: null,
  cinemaId: null,
}

const model = reactive<AddMovieInterestDto>({ ...initialValue as unknown as AddMovieInterestDto })

const schema = z.object({
  email: z.email('Helytelen e-mail formátum'),
  ticketCount:
  z.number('Kötelező mező')
    .min(1, 'A jegyek száma legalább 1, maximum 10 lehet')
    .max(10, 'A jegyek száma legalább 1, maximum 10 lehet'),
  cinemaId: z.string('Kötelező mező'),
})

const resolver = zodResolver(schema)

const moviesStore = useMoviesStore()
const cinemasStore = useCinemasStore()
const cinemas = storeToRefs(cinemasStore).cinemas
const options = computed(() => cinemas.value.map(c => ({ label: `${c.name} - ${c.city}`, value: c.id })))

const submitting = ref(false)
const submitError = ref<string | null>(null)
const submitSuccess = ref<boolean>(false)

async function onSubmit(e: FormSubmitEvent) {
  if (!e.valid)
    return

  try {
    submitting.value = true
    await moviesStore.addInterest(model)
    e.reset()
    submitError.value = null
    submitSuccess.value = true
  }
  catch (error) {
    submitSuccess.value = false
    if (error instanceof FetchError) {
      submitError.value = error.response?._data.error
    }
    else if (typeof error === 'string') {
      submitError.value = error
    }
    console.error(error)
  }
  finally {
    submitting.value = false
  }

  submitting.value = false
}

onMounted(() => {
  cinemasStore.fetchCinemas()
})
</script>

<template>
  <Form
    v-slot="$form"
    :initial-values="initialValue"
    style="display: flex; flex-direction: column; gap: 12px; width: 300px;"
    :resolver="resolver"
    :disabled="submitting"
    validate-on-submit
    @submit="onSubmit"
  >
    <IftaLabel class="input-container">
      <InputText id="email" v-model="model.email" name="email" fluid :disabled="submitting" />
      <label for="email">E-mail</label>
      <Message v-if="$form.email?.invalid" severity="error">
        {{ $form.email?.error.message }}
      </Message>
    </IftaLabel>
    <IftaLabel class="input-container">
      <InputNumber id="ticketCount" v-model="model.ticketCount" name="ticketCount" fluid :disabled="submitting" />
      <label for="ticketCount">Jegyek száma</label>
      <Message v-if="$form.ticketCount?.invalid" severity="error">
        {{ $form.ticketCount?.error.message }}
      </Message>
    </IftaLabel>
    <IftaLabel class="input-container">
      <Select
        id="cinemaId"
        v-model="model.cinemaId"
        name="cinemaId"
        fluid
        :options="options"
        option-value="value"
        option-label="label"
        :disabled="submitting"
      />
      <label for="cinemaId">Mozi</label>
      <Message v-if="$form.email?.invalid" severity="error">
        {{ $form.email?.error.message }}
      </Message>
    </IftaLabel>
    <Button type="submit" label="Érdekel" :loading="submitting" />
    <Message v-if="submitError" severity="error">
      Hiba: {{ submitError }}
    </Message>
    <Message v-if="submitSuccess" severity="success">
      Érdeklődés sikeresen elküldve!
    </Message>
  </Form>
</template>

<style lang="css" scoped>
.input-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
</style>
