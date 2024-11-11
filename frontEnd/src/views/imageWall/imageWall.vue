<script setup>
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import { tmdbApi } from "@/APIs/tmdbApi.js";
import { ref, onMounted, inject, nextTick, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
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
    shuffle(imageWall);

    for (const img of imageWall) {
      const imgWrapper = document.createElement("div");
      imgWrapper.className = "imageBrickWrap";
      const newImage = document.createElement("img");
      newImage.className = "imageBrick";
      newImage.src = tmdbApi.tmdbImgPrefix + img.file_path;
      newImage.height = img.height;
      newImage.width = img.height / img.aspect_ratio;
      newImage.loading = "lazy";
      imagesWall.value.appendChild(imgWrapper);
      imgWrapper.appendChild(newImage);
    }
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
    <template v-slot:header>
      <scrollHeader>
        <template v-slot:center>
          <h1 class="txtDarkPrimary font-bold tracking-wider">
            {{ mediaTitle }}
          </h1>
        </template>
      </scrollHeader>
    </template>
    <template v-slot:content>
      <div class="imagesWall px-4" ref="imagesWall"></div>
    </template>
  </scrollView>
</template>
<style lang="scss">
$gap: 1.5vmax;
.imagesWall {
  columns: var(--imageBrickCount);
  break-inside: avoid-column;
  column-gap: 0;
}
.imageBrickWrap {
  overflow: hidden;
  padding: $gap / 2;
  
}
.imageBrick {
  
  object-fit: contain;
  border-radius: 10px;
  border: 1px solid rgba(211, 211, 211, 0.1);
}
</style>