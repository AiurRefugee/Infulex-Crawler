<script setup>
import { inject, onMounted, ref, nextTick, computed, watch } from 'vue'; 
import { useMediaStore } from '@/stores/media'; 
const emits = defineEmits(['setIsFavorite'])
const mediaStore = useMediaStore()

// const media = ref({})
// const mediaType = ref(null)

const media = inject('media')
const mediaType = inject('mediaType')
const tvDetail = inject('tvDetail')

const favoriteMoviesId = computed( () => mediaStore.favoriteMoviesIs)
const favoriteTVsId = computed( () => mediaStore.favoriteTVsIs)
const mediaDetail = computed( () => {
  if (mediaType.value === 'movie') {
    return media.value
  }  
  if (mediaType.value === 'tv') {
    return tvDetail.value
  }
})

const isFavorite = computed(() => { 
  const movieFavorite = favoriteMoviesId.value.has(media.value?.id)
  const tvFavorite = favoriteTVsId.value.has(tvDetail.value?.id)
  const isFavorite = movieFavorite || tvFavorite
  return isFavorite
})

watch(isFavorite, async (newVal) => {
  emits('setIsFavorite', newVal)
})

const toogleFavorite = () => {
  if (!mediaDetail.value) {
    return false
  }
  console.log('toogleFavorite', mediaDetail.value, mediaType.value)
  if (isFavorite.value) {
    mediaStore.removeFromFavorite(mediaDetail.value.id, mediaType.value)
  } else {
    mediaStore.addToFavorite(mediaDetail.value, mediaType.value)
  }
  isFavorite.value = !isFavorite.value
}

defineExpose({
  toogleFavorite
})
</script>
<template>  
</template>
<style scoped lang="scss">

</style>