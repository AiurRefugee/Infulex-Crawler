<script setup>
import { ref, onMounted, computed, getCurrentInstance } from "vue";
import { layoutStore } from "@/stores/layout";
import gsap from "gsap";
const emit = defineEmits(["toogle"]);
const props = defineProps(['title']);

const layout = layoutStore();
const size = computed(() => layout.size); 
const title = computed(() => props.title)
const headerTitle = ref()
const divider = ref()
const scrollView = ref()
function toogle() {
  emit("toogle");
}

function calScroll(event) {
  const height = event.target.scrollTop; 
  const scrollTitleBottom = scrollView.value
    .querySelector("#scrollTitle")
    .getClientRects()[0].bottom;
  if (height > scrollTitleBottom ) {
    // header.style['backdropFilter'] = 'blur(20px)'
    // header.style['-webkit-backdrop-filter'] = 'blur(20px)'
    // header.style.background = 'none'

    gsap.to(headerTitle.value, { duration: 0.2, opacity: 1, ease: "power1.inOut" });
    // gsap.to('#stickyHeader', { duration: 0.2, background: 'white', ease: "power1.inOut" })
    if (height > scrollTitleBottom + 30) {
      gsap.to(divider.value, { duration: 0.2, opacity: 1, ease: "power1.inOut" });
      
    } else {
      gsap.to(divider.value, { duration: 0.2, opacity: 0, ease: "power1.inOut" });
    }
  } else {
    // header.style['backdropFilter'] = 'none'
    // header.style['-webkit-backdrop-filter'] = 'none'
    // header.style.background = '#fff'
    gsap.to(headerTitle.value, { duration: 0.2, opacity: 0, ease: "power1.inOut" });
    // gsap.to('#stickyHeader', { duration: 0.2, background: 'transparent', ease: "power1.inOut" })

  }
}
onMounted(() => {
  console.log(this)
})
</script>
<template>
  <div
    class="scrollView"
    ref="scrollView"
    :style="{ paddingTop: size == 'normal' ? '5vh' : '0' }"
    @scroll="calScroll"
  >
    <header class="stickyHeader">
      <div class="upperGrid">
        <div class="tabIcon">
          <button
            @click="toogle"
            :style="{
              display: size == 'normal' ? '' : 'none',
            }"
          >
            <svg
              t="1707469394304"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4203"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <path
                fill="#f59305fa"
                d="M384 213.333333a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334zM263.253333 213.333333a128.042667 128.042667 0 0 1 241.493334 0H810.666667a42.666667 42.666667 0 1 1 0 85.333334h-305.92a128.042667 128.042667 0 0 1-241.493334 0H213.333333a42.666667 42.666667 0 0 1 0-85.333334h49.92zM640 469.333333a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334z m-120.746667 0a128.042667 128.042667 0 0 1 241.493334 0H810.666667a42.666667 42.666667 0 1 1 0 85.333334h-49.92a128.042667 128.042667 0 0 1-241.493334 0H213.333333a42.666667 42.666667 0 1 1 0-85.333334h305.92zM384 725.333333a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334z m-120.746667 0a128.042667 128.042667 0 0 1 241.493334 0H810.666667a42.666667 42.666667 0 1 1 0 85.333334h-305.92a128.042667 128.042667 0 0 1-241.493334 0H213.333333a42.666667 42.666667 0 1 1 0-85.333334h49.92z"
                p-id="4204"
              ></path>
            </svg>
          </button>
        </div>
        <h1 ref="headerTitle" class="title">{{ title }}</h1>
      </div>
      <div ref="divider" class="divider"></div>
    </header> 
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
@import "@/style/variables.scss";
$paddingSize: 2%;
$tabIconSize: 2rem;
.test {
  width: 90%;
  height: 20vh;
  background: gray;
  margin: 2%;
}
.scrollView {
  width: 100%;
  height: 100%;
  //   padding: 0 $tabLeftSpace;
  overflow-x: hidden;
  overflow-y: auto;
  // transform: translateX(0);
  padding-top: $headerHeight;
  .stickyHeader {
    // -webkit-backdrop-filter: blur(20px);
    // backdrop-filter: blur(20px);
    width: 100%;
    height: $headerHeight;
    position: relative;
    transform: 0;
    top: 0;
    z-index: 99;
    // transition: $basicTrans;
    position: fixed;
    background: white;
    // transition: all 0.2s ease-in-out;
    // padding: 0 $tabLeftSpace;
    .upperGrid {
      width: 100%;
      height: 98%;
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
      grid-template-rows: 100%;
      align-items: center;
      justify-items: center;
      .tabIcon {
        width: $tabIconSize;
        aspect-ratio: 1 / 1;
        justify-self: left;
        margin-left: 0.5rem;
        svg {
          width: 90%;
          aspect-ratio: 1 / 1;
        }
      }
      .title {
        color: red;
        opacity: 0;
      }
    }
    .divider {
      width: 100%;
      height: 1px;
      opacity: 0;
      background: red;
    }
  } 
}
</style>