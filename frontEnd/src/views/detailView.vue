<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get, post } from "@/APIS/axiosWrapper.js";

import { useFilmStore } from "@/stores/films";
// 可以在组件中的任意位置访问 `store` 变量 ✨
const filmStore = useFilmStore();

const router = useRouter();
const route = useRoute();

const actors = ref([]);
const urls = ref([]);
const genres = ref([]);
const displayContent = ref({
  background: "",
  title: "",
  overview: "",
  releaseDate: "",
});
 
const filmDetail = computed(() => filmStore.filmDetail);

function bacak() {
  router.back();
}
onMounted(async () => {
  console.log(route.params.movieId);
  const cast = await get("/getMovieCredits", {
    movieId: route.params.movieId,
  });
  actors.value = cast.data;
  console.log(actors.value);
  // const detail = await post("/findFilms", {
  //   _id: Number(route.params.movieId),
  // });
  // console.log(detail);
  // if (detail.data) { 
  const filmDetail = JSON.parse(localStorage.getItem("filmDetail"))
  console.log('localFilm', filmDetail)
  if (filmDetail) { 
    const film = filmDetail.film
    displayContent.value.overview = film.overview;
    displayContent.value.title = film.title;
    displayContent.value.background = `/filmImages/w1280${filmDetail.imageUrls[0]}`;
    displayContent.value.releaseDate = film.release_date;
    genres.value = film.genre_ids.map((item) => filmStore.tags[item]);
    urls.value = filmDetail.aliUrls;
    console.log('displayContent', displayContent.value);
  }
  
  // }
});
</script>
<template>
  <div class="detailView">
    <div
      class="upperArea flex flex-col justify-between"
      :style="{ backgroundImage: `url(${displayContent.background})` }"
    >
      <div class="detailHeader flex w-full justify-between items-center mt-2">
        <div class="text-white cursor-pointer" @click="bacak">Back</div>
      </div>
      <div class="infoWrapper py-1">
        <h1 class="detailFilmName">{{ displayContent.title }}</h1>
        <div class="info flex ml-2 items-center">
          <div class="mr-2">7.6</div>
          <div class="mr-2">2小时7分钟</div>
          <div class="mr-2">{{ displayContent.releaseDate }}</div>
          <div class="mr-2 pg">PG-13</div>
        </div>
        <div class="info flex ml-2 my-1 items-center">
          <div class="mr-2" v-for="genre in genres" :key="genre">
            {{ genre.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="presentArea flex justify-around items-center">
      <button class="play">删除</button>
      <p class="presentation">{{ displayContent.overview }}</p>
    </div>
    <div class="castAreaWrapper">
      <p class="title">演员和工作人员</p>
      <div class="actorsWrapper flex">
        <div class="actor" v-for="actor in actors" :key="actor">
          <div class="poster">
            <img
              class="w-full h-full object-cover"
              :src="`/creditsPosters/${actor.name}.jpg`"
            />
          </div>
          <div class="primRow">{{ actor.name }}</div>
          <div class="secRow">{{ actor.character }}</div>
        </div>
      </div>
    </div>
    <div class="selectSource">
      <p class="title">文件源</p>
      <div class="sourceWrapper flex w-full overflow-x-auto overflow-y-hidden">
        <div
          class="sourceItem flex justify-center items-center"
          v-for="url in urls"
          :key="url"
        >
          <a class="sourceText" :href="url" target="blank">{{ url }}</a>
          <img class="h-5/6 mx-1" src="/src/assets/icons/close.svg" />
        </div>
      </div>
    </div>
    <div class="w-full h-10"></div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/style/variables.scss";
$upperHeight: 52vh;
$castHeight: 40vh;
$basicColor: rgb(172, 172, 172);
@keyframes enter {
  from {
    transform: translateX(100%);
    opacity: 0.5;
    // position: relative;
    // z-index: 9999;
  }

  to {
    transform: translateX(0%);
    opacity: 1;
  }
}
.detailView {
  width: 100dvw;
  height: 100dvh;
  overflow-x: hidden;
  overflow-y: auto;
  animation: enter 0.6s ease-in-out;
}
.upperArea {
  width: 100vw;
  height: 55vh;
  //   background-color: lightgray;
  background-position: center;
  background-size: cover;
  background-position: 0 30%;
  background-repeat: no-repeat;
  .detailHeader {
    padding: var(--leftSpace);
    height: 30px;
    font-size: 20px;
  }
  .infoWrapper {
    width: 100%;
    backdrop-filter: blur(5px);
    align-self: flex-end;
    padding-left: var(--leftSpace);
    padding-bottom: 10px;
    box-shadow: 0px -15px 10px 5px rgb(177 169 169 / 10%);
    // background: linear-gradient(to top, hsla(0, 0%, 50%, 0.2), transparent);
    .detailFilmName {
      white-space: nowrap;
      // text-overflow: ellipsis;
      overflow: auto;
      font-size: 2.5rem;
      letter-spacing: 5px;
      color: white;
      font-weight: bold;
    }
    .info {
      font-size: 0.8rem;
      height: 1rem;
      color: rgb(237 237 237);
    }
  }
  .pg {
    border: 1px solid white;
    border-radius: 4px;
    padding: 0 5px;
  }
}
.title {
  font-size: 1.2rem;
  padding: var(--leftSpace);
  color: var(--textColor_Primary);
}
.primRow {
  font-size: 0.9rem;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  width: 95%;
  color: var(--textColor_Primary);
}
.secRow {
  max-width: 90%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  font-size: 0.8rem;
  color: var(--txtColor_Secondary);
}
.presentArea {
  width: 100vw;
  margin: 1rem;
  //   padding-left: var(--leftSpace);
  padding-right: 5vw;
  font-size: 20px;

  .play {
    width: 15vw;
    aspect-ratio: 2 / 1;
    margin: 1rem;
    // background: red;
    border-radius: 2rem;
    flex-shrink: 0;
    color: var(--textColor_Primary);
  }
  .presentation {
    width: 85vw;
    overflow: auto;
    text-indent: 2rem;
    text-transform: capitalize;
    color: var(--txtColor_Basic);
    font-size: 1rem;
    align-self: flex-start;
    display: -webkit-box;
    -webkit-box-orient: vertical; 
    -webkit-line-clamp: 6; /* 限制为3行 */
    overflow: hidden;
    text-overflow: ellipsis; 
    
  } 
}
.castAreaWrapper {
  width: 100%;
  //   height: $castHeight;

  .actorsWrapper {
    width: 100vw;
    padding-left: var(--leftSpace);
    overflow-x: auto;
    overflow-y: hidden;
  }
  .actor {
    width: var(--actorWidth);
    display: flex;
    margin-right: 5px;
    flex-shrink: 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .poster {
      width: 80%;
      margin-bottom: 5px;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      overflow: hidden;
    }
  }
}
.selectSource {
  //   margin-top: 10px;
  width: 100vw;
  margin-bottom: 30px;
}
.sourceWrapper {
  width: 100vw;
  padding-left: var(--leftSpace);
  overflow-x: auto;
  overflow-y: hidden;
}
.sourceItem {
  height: 20px;
  margin-right: 20px;
  flex-shrink: 0;
  cursor: pointer;
  .sourceText {
    color: var(--txtColor_Secondary);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 300px;
  }
}
</style>