import { inject, onMounted, ref, nextTick, computed } from 'vue'; 
import { useMeidaStore } from '@/stores/media';
const mediaStore = useMeidaStore()

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

export const isFavorite = computed(() => {
  if (mediaType.value === 'movie') {
    return favoriteMoviesId.value.has(media.value?.id)
  }  
  if (mediaType.value === 'tv') {
    return favoriteTVsId.value.has(tvDetail.value?.id)
  } 
})

export const toogleFavorite = () => {
  if (!mediaDetail.value) {
    return false
  }
  console.log('toogleFavorite', mediaDetail.value, mediaType.value)
  if (isFavorite.value) {
    mediaStore.removeFromFavorite(mediaDetail.value.id, mediaType.value)
  } else {
    mediaStore.addToFavorite(mediaDetail.value, mediaType.value)
  }
}

