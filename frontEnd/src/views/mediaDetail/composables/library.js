
import { computed, watch } from 'vue';
import { useMediaStore } from '@/stores/media'; // 假设这是你的store

export default function useFavoriteToggle(media, mediaType, tvDetail) {
  const mediaStore = useMediaStore();

  const movieLibrary = computed(() => mediaStore.movieLibraryIs);
  const tvLibrary = computed(() => mediaStore.tvLibraryIs);

  const mediaDetail = computed(() => {
    if (mediaType.value === 'movie') {
      return media.value;
    }
    if (mediaType.value === 'tv') {
      return tvDetail.value;
    }
    return null;
  });

  const inLibrary = computed(() => {
    const inMovieLibrary = movieLibrary.value.has(media.value?.id);
    const inTVLibrary = tvLibrary.value.has(tvDetail.value?.id);
    return inMovieLibrary || inTVLibrary;
  });

  const toggleLibrary = () => {
    if (!mediaDetail.value) {
      return;
    }
    console.log('toggleLibrary', mediaDetail.value, mediaType.value);
    if (inLibrary.value) {
      mediaStore.removeFromLibrary(mediaDetail.value, mediaType.value);
    } else {
      mediaStore.addToLibrary(mediaDetail.value, mediaType.value);
    }
    // 注意：直接修改isFavorite.value可能会导致问题，因为它是一个响应式引用
  };

  return {
    mediaDetail,
    inLibrary,
    toggleLibrary
  };
}