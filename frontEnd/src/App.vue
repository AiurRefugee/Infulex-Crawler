<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router"; 
const router = useRouter();
import { get, post } from "@/APIS/axiosWrapper.js"
import { useFilmStore } from "@/stores/films.ts"
import { layoutStore } from '@/stores/layout'
import { taskStore } from "@/stores/tasks";

const tasks = taskStore();

const layout = layoutStore();
const filmStore = useFilmStore()

const breakPointSmall = 628;
const breakPointNormal = 1375;

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
  // router.push({
  //   name: 'search',
  //   replace: true,
  // })
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
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition">
        <component :is="Component" />
      </transition>
    </router-view> 
</template>