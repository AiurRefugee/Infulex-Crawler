<script setup>
import { ref, computed, onMounted } from "vue";
const props = defineProps(["medias", "title"]);
const imageSrcPrefix = "https://image.tmdb.org/t/p/original";
onMounted(() => {});
</script>
<template>
  <div class="overviewWrapper">
    <h2 class="h-8 pl-4 flex items-center txtDark_Primary">{{ title }}</h2>
    <div class="cardsWrapper flex flex-col flex-wrap overflow-x-auto overflow-y-hidden pl-6">
      <div class="overviewCard" v-for="media in medias" :key="media">
        <div class="flex">
          <div class="poster">
            <img
              class="w-full h-full object-cover"
              :src="media ? imageSrcPrefix + media.poster_path : ''"
            />
          </div>
          <div class="overview flex flex-col justify-around">
            <p class="overflow-hidden limitRow text-sm txtDark_Secondary">
              {{ media ? media.overview : "" }}
            </p>
            <p
              class="text-sm flex justify-between items-center pr-1 overflow-visible"
            >
              <span
                class="w-1/2 filmTitle whitespace-nowrap overflow-hidden text-ellipsis txtDark_Primary"
                >{{ media ? media.title || media.name : "" }}</span
              >
              <span class="singleLine txtDark_Basic">{{ media ? media.genre_ids || "" : "" }}</span>
            </p>
          </div>
        </div>
        <!-- <div class="operation">
          <button>Detail</button>
        </div> -->
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/style/variables.scss";
.overviewWrapper {
  color: var(--textColor_Primary);
  position: relative;
  z-index: 0;
  background: var(--bg_Primary);
}
.cardsWrapper { 
  height: var(--overviewHeight);
}
.overviewCard {
  width: calc(100% / var(--overviewCardNum));
  height: 33%; 
  display: flex;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0.2rem;
  margin-right: var(--overviewSpace);
   
  .poster {
    aspect-ratio: 3 / 4;
    flex-shrink: 0;
    height: 100%; 
    margin-right: 1rem;
    border-radius: var(--overviewRadius);
    overflow: hidden;
  }
  .overview {
    width: 80%;
    height: 100%;
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    border-bottom: 1px solid lightgray;
  }
  .limitRow {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--overviewRowLimit);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal; /* 确保white-space不是nowrap */
  }
  .operation {
    height: 100%;
    display: flex;
    width: 100px;
    justify-content: center;
    align-items: center;
    padding: 0 0.8rem;
    color: var(--textColor_Primary);
  }
}
</style>