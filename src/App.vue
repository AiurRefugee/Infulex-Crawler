<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router"; 
const route = useRoute();
import { get, post } from "@/APIS/axiosWrapper.js"
import { useFilmStore } from "@/stores/films.ts"
import { layoutStore } from '@/stores/layout'
const layout = layoutStore();
const filmStore = useFilmStore()

const breakPointSmall = 600;
const breakPointNormal = 1400;

function calWindowSize() {
  var newSize = "normal";
  console.log("resize");
  const windowSize = window.innerWidth;
  if (windowSize <= breakPointSmall) {
    newSize = "small"; 
  } else if (windowSize > breakPointSmall && windowSize <= breakPointNormal) {
    newSize = "normal"; 
  }
  if (windowSize > breakPointNormal) {
    newSize = "large"; 
  }  
  layout.setSize(newSize)
  return newSize;
}
onMounted(() => { 
  calWindowSize();
  window.addEventListener("resize", calWindowSize);
})

// onMounted(async () => {

//   post('/findFilms').then((res) => filmStore.films = res.data)
  
//   get('/getClasses').then((res) => {
//     const tags = {}
//     const films = res.data 
//     for (const film of films) { 
//       if (film && film.imageUrls) {
//         tags[film.genreId] = {
//           backgroundUrl: film.imageUrls[0],
//           backgroundColor: film.background,
//           name: film.genreName
//         }
//       }
      
//     }
//     filmStore.tags = tags
//     console.log(tags)
//   })
 
//   get('/getTopTwenty').then((res) => filmStore.topTwenty = res.data)


//   document.addEventListener("resize", () => {
//     const listDom = document.getElementsByClassName("list");
//     Array.from(listDom).forEach((item) => {
//       item.style.overflow = "hidden";
//     });
//   });
// });

</script>
<template>
  <div class="appContainer">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>