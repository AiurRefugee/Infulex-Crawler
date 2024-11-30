<script setup>
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import { tmdbApi } from "@/apis/tmdbApi.js";
import { ref, onMounted, inject, nextTick, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import Backword from "@/components/common/backword.vue";
const route = useRoute();
const router = useRouter();
const imageLength = 50;
const mediaTitle = ref("");
const images = ref([]);
const imagesWall = ref();

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // 生成一个随机数，范围是0到i（包含i）
    let j = Math.floor(Math.random() * (i + 1));
    // 交换当前索引i和随机索引j的元素
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const render = async (mediaId, mediaType) => {
  if (mediaId && mediaType) {
    const imageArray = await tmdbApi.getImages(mediaId, mediaType);
    const imageWall = [
      ...imageArray.backdrops.slice(0, imageLength),
      ...imageArray.posters.slice(0, imageLength),
    ];
    images.value = shuffle(imageWall); 
  }
};

onMounted(() => {
  const { mediaId, mediaType, title } = route.query;
  mediaTitle.value = title;
  render(mediaId, mediaType);
});
</script>
<template>
  <scrollView>
    <template #header>
      <scrollHeader class="h-[45px]">
        <template #left>
          <Backword @click="router.go(-1)"/>
        </template>
        <template #center>
          <h1 class="txtDarkPrimary font-bold tracking-wider">
            {{ mediaTitle }}
          </h1>
        </template>
      </scrollHeader>
    </template>
    <template #content>
      <div class="imagesWall px-4" ref="imagesWall">
        <div class="imageBrickWrap" v-for="img in images" :key="img" :style="{ aspectRatio: img.aspect_ratio }">
          <img class="imageBrick" loading="lazy" :src="tmdbApi.tmdbImgPrefix + img.file_path" alt="" /> 
        </div>
      </div>
    </template>
  </scrollView>
</template>
<style lang="scss">
$gap: 1rem;
.imagesWall {
  columns: var(--image_brick_count);
  
  column-gap: $gap;
}
.imageBrickWrap {
  overflow: hidden; 
  break-inside: avoid-column; 
  margin-bottom: $gap;
}
.imageBrick {
  object-fit: contain; 
  border-radius: 8px;
  border: 1px solid rgba(211, 211, 211, 0.15);
}
</style>