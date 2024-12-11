<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, watch, nextTick, computed } from "vue";
import scrollDetail from "@/components/scrollDetail.vue";
import { tmdbApi } from "@/apis/tmdbApi.js";
import { layoutStore } from "@/stores/layout";
import { useMediaStore } from "@/stores/media";
import TypeTab from "../../../components/common/typeTab.vue";
const route = useRoute();
const router = useRouter();
const { genreName } = route.params;
const layout = layoutStore();
const mediaStore = useMediaStore();

const genres = computed(() => mediaStore.genres);
const tvGenre = computed(() => mediaStore.tvGenre);
const movieTag = computed(() =>
  genres.value.find((item) => item.name == genreName)
);
const tvTag = computed(() =>
  tvGenre.value.find((item) => item.name == genreName)
);
const showTab = computed(() => movieTag.value && tvTag.value);
const type = ref("movie");
const scrollDetailRef = ref(null);

const queryParam = {
  page: 0,
  language: "zh-CN",
  mediaType: type.value,
  "vote_average.gte": 7.0,
  "vote_count.gte": 500,
};

const getList = (res) => res.results;

watch(type, async (newVal) => {
  queryParam.mediaType = newVal;
  queryParam.page = 0;
  scrollDetailRef.value.clearList();
  scrollDetailRef.value.search();
});

onMounted(() => {
});
</script>
<template>
  <scrollDetail
    :title="genreName"
    :api="tmdbApi.discover"
    :showTab="showTab"
    :getResFunc="getList"
    :params="queryParam"
    ref="scrollDetailRef"
  >
    <TypeTab class="h-[30px]" v-model:mediaType="type" />
  </scrollDetail>
</template>
<style scoped>
</style>