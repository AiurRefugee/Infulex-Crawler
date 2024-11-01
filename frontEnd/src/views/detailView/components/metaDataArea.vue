<script setup>
import { ref, computed, inject } from "vue";
const media = inject("media");
const genres = computed(() =>
  media?.value?.genres?.map((g) => g.name).join(", ")
);
const release_date = computed(
  () => media?.value?.release_date || media?.value?.first_air_date
);
const runtime = computed(() => calTimeStr(media?.value?.runtime || 0));

const calTimeStr = (time) => {
  if (!time) return "";
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}${hours ? '小时' : ''}${minutes}分钟`;
};
</script>
<template>
  <div class="txtLightPrimary">
    <h1 class="text-[1.5em] font-bold">{{ media?.title || media?.name }}</h1>
    <div class="metalist text-[0.9em] flex h-6 gap-3 items-center">
      <span class="center gap-1">
        <svg class="icon h-3 aspect-square" viewBox="0 0 1024 1024">
          <path
            d="M707.584 93.184c-77.312 0-148.992 38.912-196.608 102.912-47.104-64-119.296-102.912-196.608-102.912-139.264 0-252.416 123.904-252.416 275.968 0 90.624 40.448 154.624 73.216 205.824 94.72 148.992 333.312 333.824 343.552 341.504 9.728 7.68 20.992 11.264 32.256 11.264s22.528-3.584 32.256-11.264c10.24-7.68 248.32-193.024 343.552-341.504 32.768-51.2 73.216-115.2 73.216-205.824 0-152.064-113.152-275.968-252.416-275.968z"
            fill="white"
            p-id="5647"
          ></path>
        </svg>
        <text>{{ media?.vote_average }}</text>
      </span>
      <text>{{ release_date?.split("-")?.[0] }}</text>
      <text v-if="runtime">{{ runtime }}</text>
      <text class="tag">4K</text>
      <text class="tag">HDR</text>
      <!-- genere -->
      <span class="hideControl">
        <text v-for="genre in genres" :key="genre">{{ genre }}</text>
      </span>
    </div>
    <p class="text-[0.9em] onlyMobile">
      <text v-for="genre in genres" :key="genre">{{ genre }}</text>
    </p>
    <p class="hideControl h-[3.6em] leading-[1.2em] text-[0.9em]">{{ media?.overview }}</p>
  </div>
</template>
<style scoped lang="scss">
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