// useFavoriteToggle.js
import { computed, watch } from 'vue';
import { useMediaStore } from '@/stores/media';

export default function useFavoriteToggle(media, mediaType, tvDetail) {
  const mediaStore = useMediaStore();

  const favoriteMoviesId = computed(() => mediaStore.favoriteMoviesIs);
  const favoriteTVsId = computed(() => mediaStore.favoriteTVsIs);

  const mediaDetail = computed(() => {
    if (mediaType.value === 'movie') {
      return media.value;
    }
    if (mediaType.value === 'tv') {
      return tvDetail.value;
    }
    return null;
  });

  const isFavorite = computed(() => {
    const movieFavorite = favoriteMoviesId.value.has(media.value?.id);
    const tvFavorite = favoriteTVsId.value.has(tvDetail.value?.id);
    return movieFavorite || tvFavorite;
  });

  const toggleFavorite = () => {
    if (!mediaDetail.value) {
      return;
    }
    console.log('toggleFavorite', mediaDetail.value, mediaType.value);
    if (isFavorite.value) {
      mediaStore.removeFromFavorite(mediaDetail.value.id, mediaType.value);
    } else {
      mediaStore.addToFavorite(mediaDetail.value, mediaType.value);
    }
    // 注意：直接修改isFavorite.value可能会导致问题，因为它是一个响应式引用
  };

  return {
    mediaDetail,
    isFavorite,
    toggleFavorite
  };
}