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
  const scrollTitle = scrollView.value
    .querySelector("#scrollTitle")
    .getClientRects()[0];
  const threshold = (scrollTitle.top + scrollTitle.bottom) / 2;
  const header = scrollView.value.querySelector("header");
  const title = header.querySelector("h1");
  const divider = header.querySelector(".divider");
  if (height > threshold ) {
    // header.style['backdropFilter'] = 'blur(50px)'
    // header.style['-webkit-backdrop-filter'] = 'blur(20px)'
    // header.style.background = 'var(--bg_Primary)'

    gsap.to(title, { duration: 0.2, opacity: 1, ease: "power1.inOut" });
    // gsap.to('#stickyHeader', { duration: 0.2, background: 'white', ease: "power1.inOut" })
    if (height > threshold + 36) {
      gsap.to(divider, { duration: 0.2, opacity: 1, ease: "power1.inOut" });
      header.style['backdropFilter'] = 'blur(30px)' 
      header.style['-webkit-backdrop-filter'] = 'blur(30px)'
      header.style.background = 'rgb(0 0 0 / 80%)'

    } else {
      gsap.to(divider, { duration: 0.25, opacity: 0, ease: "power1.inOut" });
      header.style['backdropFilter'] = 'none'
      header.style['-webkit-backdrop-filter'] = 'none'
      header.style.background = 'var(--bg_Primary)'
    }
  } else {
    
    // header.style['-webkit-backdrop-filter'] = 'none'
    // header.style.background = 'transparent'
    gsap.to(title, { duration: 0.2, opacity: 0, ease: "power1.inOut" });
    header.style.background = 'var(--bg_Primary)'
    gsap.to(divider, { duration: 0.2, opacity: 0, ease: "power1.inOut" });
    // gsap.to('#stickyHeader', { duration: 0.2, background: 'transparent', ease: "power1.inOut" })

  }
}
onMounted(() => { 
})
</script>
<template>
  <div
    class="scrollView"
    ref="scrollView"
    :style="{  
    }"
    @scroll="calScroll"
  >
    <slot name="header"></slot>
    <slot name="content"></slot>
  </div>
</template>
<style lang="scss" scoped>
@import "@/style/variables.scss";
$paddingSize: 2%;
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
  // transform: translate(0, 0);
  overflow-x: hidden;
  overflow-y: auto;
  // transform: translateX(0);
  padding-top: $headerHeight;
  
   
}
</style>