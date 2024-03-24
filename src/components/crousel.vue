<script setup>
import { onMounted, ref, computed } from "vue";
import { layoutStore } from "@/stores/layout";
import gsap from "gsap";
const store = layoutStore();
const size = computed(() => store.size);
const showTab = computed(() => store.showTab);
const imgScale = computed(() => store.imgScale);
const imgTop = computed( () => store.imgTop)
const props = defineProps(["medias", "title"]);
const imageSrcPrefix = "https://image.tmdb.org/t/p/original";
var wrapper = null;
var wrapperHeight = null
var crouselIndex = 1;
function calHeight(event) {
  if (wrapper) {
    //console.log(wrapper.scrollLeft);
    const height = wrapper.scrollTop
    console.log(height)
  }
}
function calScrollLeft() {
  if (wrapper) {
    const width = window.innerWidth;
    gsap.to(wrapper, {
      duration: 1,
      scrollLeft: (crouselIndex % 20) * width,
      ease: "power1.out",
    });
    crouselIndex += 1;
  }
}
onMounted(() => {
  wrapper = document.getElementById("crouselWrapper");
  wrapperHeight = wrapper.clientHeight;
  console.log(wrapperHeight);
  // setInterval(calScrollLeft, 5000);
});
</script>
<template>
  <div
    id="crouselWrapper"
    class="crouselWrapper flex w-full"
    @scroll="calHeight"
  >
    <h1
      id="scrollTitle"
      class="crouselTitle fastTrans pl-10 pt-2 absolute top-10 z-10 text-2xl"
      :style="{
        top: showTab ? '0' : '2.5rem',
        
      }"
    >
      浏览
    </h1>
    <div class="w-full flex overflow-auto">
      <div
        v-for="media in medias"
        :key="media.id"
        class="crouselCard"
        :style="{
          // aspcetrRatio: imgRatio,
          // backgroundImage: 'url(' + imageSrcPrefix + media.backdrop_path + ')',
        }"
      >
        <img :src="imageSrcPrefix + (size != 'small' ? media.backdrop_path : media.poster_path)" alt=""
        :style="{
          top: imgTop + 'px',
          // scale: imgScale,
        }"/>
        <div v-if="size != 'small'"
          class="media flex flex-col p-4 pl-6 justify-around absolute bottom-0 overflow-hidden"
        >
          <h1 class="">{{ media.title }}</h1>
          <p class="leading-relaxed indent-8 my-2" v-if="size != 'small'">
            {{ media.overview }}
          </p>
          <p class="singleLine my-2">{{ media.genre_ids }}</p>
          <p class="singleLine my-2" v-if="size != 'small'">
            {{ media.release_date }}
          </p>
        </div>
      </div>
    </div>

    <div class="crouselPointerWrapper flex justify-center items-center">
      <div class="crouselPointer"></div>
    </div>
  </div>
  <!-- <div id="scrollTitle" class="spacePlace"></div> -->
</template>
<style scoped lang="scss">
@import "@/style/variables.scss";
$height: 70vh;
.crouselWrapper {
  --cardW: calc(100% / var(--crouselCardNum));
  --cardH: calc(var(--cardW) / var(--crouselAspectRatio));
  color: var(--txtColor_Primary);
  position: relative;
  overflow: auto;
  // z-index: -1;
  transform: translate(0, 0);
  // top: -100px;
  //   height: var(--cardH);
  .crouselTitle {
    color: white !important;
    box-sizing: content-box;
    text-shadow: 0px 0px 10px black;
  }
  .crouselPointerWrapper {
    width: 100%;
    height: 1.5rem;
    position: fixed;

    bottom: 0;
    .crouselPointer {
      width: 20%;
      height: 1rem;
      background: white;
    }
  }
}
.crouselCard {
  color: white;
  width: var(--cardW);
  // border-radius: 1rem;
  overflow: hidden;
  aspect-ratio: var(--crouselAspectRatio);
  flex-shrink: 0;
  //position: fixed;
  top: 0;
  background-position: 50% 40%;
  background-size: cover;
  // margin-right: 1rem;
  position: relative;
  overflow: hidden;
  img {
    // border-radius: 1rem;
    // position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    // aspect-ratio: 4 / 3;
    object-fit: cover;
    // height: $height;
    z-index: -1;
  }
  .media {
    text-shadow: 0px 0px 10px black;
    width: max(30%, 400px);
    // height: max(50, 250px);
    h1 {
      font-size: 2rem;
      font-weight: 700;
    }
    h1,
    p {
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
  }
}
.spacePlace {
  width: 100vw;
  position: relative;
  // top: -4rem;
  z-index: -2;
  aspect-ratio: 21 / 8;
}
</style>