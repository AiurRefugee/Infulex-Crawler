<script setup>
import { ref, computed, inject } from "vue";
const media = inject("media"); 
const generes = inject('generes')
const seasonNum = inject('seasonNum')
const episodeNum = inject('episodeNum')
const mediaType = inject('mediaType') 
const release_date = computed(
  () => media?.value?.release_date || media?.value?.first_air_date
);
const runtime = computed(() => {
  const time = media?.value?.runtime
  if (!time) return "";
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours ? hours : ''}${hours ? '小时' : ''}${minutes}分钟`;
});



const title = computed( () => media.value?.title || media.value?.name )
const generesStr = computed( () => generes.value.map(item => item.name).join(', ') )
</script>
<template>
  <div class="title txtLightPrimary">
    <div class="flex items-center" v-if="mediaType == 'tv'">
      <h1 class="whitespace-nowrap">第{{ seasonNum }}季</h1>
      <span class="dot flex-shrink-0 bg-white w-2 h-2 mx-2 rounded-full"></span>
      <h1 class="whitespace-nowrap">第{{ episodeNum }}集</h1>
      <span class="bg-white whitespace-nowrap w-3 overflow-hidden text-ellipsis h-1 mx-2 "></span>
      <h1 class="singleLine">{{ title }}</h1>
    </div>
    <div v-if="mediaType == 'movie'">
      <h1 class="whitespace-nowrap">{{ title }}</h1>
    </div>
    <div class="metalist text-[0.9em] flex h-6 gap-3 items-center">
      <span class="center gap-1">
        <svg class="icon h-3 aspect-square" viewBox="0 0 1024 1024">
          <path
            d="M707.584 93.184c-77.312 0-148.992 38.912-196.608 102.912-47.104-64-119.296-102.912-196.608-102.912-139.264 0-252.416 123.904-252.416 275.968 0 90.624 40.448 154.624 73.216 205.824 94.72 148.992 333.312 333.824 343.552 341.504 9.728 7.68 20.992 11.264 32.256 11.264s22.528-3.584 32.256-11.264c10.24-7.68 248.32-193.024 343.552-341.504 32.768-51.2 73.216-115.2 73.216-205.824 0-152.064-113.152-275.968-252.416-275.968z"
            fill="white"
            p-id="5647"
          ></path>
        </svg>
        <text class="whitespace-nowrap">{{ media?.vote_average }}</text>
      </span>
      <text class="whitespace-nowrap">{{ release_date?.split("-")?.[0] }}</text>
      <text class="whitespace-nowrap" v-if="runtime">{{ runtime }}</text>
      <text class="tag">4K</text>
      <text class="tag">HDR</text>
      <!-- genere -->
      <span class="hideControl">
        <text class="whitespace-nowrap">{{ generesStr }}</text>
      </span>
    </div>
    <p class="text-[0.9em] onlyMobile">
      <text class="whitespace-nowrap">{{ generesStr }}</text>
    </p>
    <p class="hideControl h-[3.6em] leading-[1.2em] text-[0.9em] overflow-hidden text-ellipsis">{{ media?.overview }}</p>
  </div>
</template>
<style scoped lang="scss">
.title h1 {
  font-weight: bold;
  font-size: 1.5em;
  text-shadow: 1px 1px 5px gray;
} 
.tag {
  width: 3em;
  height: 1.2em;
  font-weight: 600;
  border: 1px solid white; 
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.onlyMobile {
  display: none;
}
@media (width < 500px) or (height < 500px) {
  .hideControl {
    display: none;
  }
  .onlyMobile {
    display: block;
  }
}
</style>