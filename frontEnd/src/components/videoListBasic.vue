<script setup>
import { useRouter } from "vue-router";
import gsap from "gsap";
import BasicCard from '@/components/cards/videoCardBasic.vue'
import { useFilmStore } from "@/stores/films.ts";


const filmStore = useFilmStore();

const router = useRouter();
const props = defineProps(["medias", "title"]);

function toDetail() {
  router.push("/detail/" + props.item.film._id);
  filmStore.filmDetail = props.item;
  localStorage.setItem("filmDetail", JSON.stringify(props.item));
  document.documentElement.style.setProperty("--headerOpacity", 0);
}
</script>
<template>
  <div class="basicWrapper flex flex-col justify-around">
    <h2 class="h-16 pl-4 flex items-center txtDark_Primary">{{ title }}</h2>
    <div class="flex w-full overflow-x-auto overflow-y-hidden pl-6">
      <BasicCard :media="media" v-for="(media, index) in medias" :key="index"/>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/style/variables.scss";
.basicWrapper {
  color: var(--textColor_Primary);
  width: 100%;
  overflow: hidden;
  position: relative;
  z-index: 0;
  background: var(--bg_Primary); 
} 

</style>