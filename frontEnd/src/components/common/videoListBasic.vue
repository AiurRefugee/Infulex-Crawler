<script setup>
import arrowButton from "./arrowButton.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const props = defineProps({
  title: {
    Required: false,
    default: "--",
  },
  list: {
    Required: true,
    default: [""],
  },
});

const router = useRouter();

const scrolling = ref(false);
const listRef = ref(null);

function toAll() {
  if (props.showAllPath) {
    router.push(props.showAllPath);
  } else {
  }
}

const calFading = (e) => {
  if (e.target.scrollLeft > 10) {
    scrolling.value = true;
  } else {
    scrolling.value = false;
  }
};

const nextPage = (num) => {
  console.log("nextPage");
  const space = listRef.value.clientWidth * num;
  listRef.value.scrollBy({
    left: space,
    behavior: "smooth",
  });
}

onMounted(() => { });
</script>
<template>
  <div>
    <div class="listHead px-4 flex justify-between items-center">
      <h1 class="listTitle font-bold text-dark-900">
        {{ title || "--" }}
      </h1>
      <slot name="showAll"></slot>
    </div>
    <div class="relative listWrap">
      <div ref="listRef" class="list flex pl-4 justify-stretch items-center overflow-x-auto snap-x" @scroll="calFading">
        <slot name="card" class="" :media="media" v-for="media in list" :key="media">
        </slot>
      </div>
      <div class="left side center">
        <arrowButton class="arrow rotate-180" @click="nextPage(-1)" />
      </div>
      <div class="right side center">
        <arrowButton class="arrow" @click="nextPage(1)" />
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
<style lang="scss">
::-webkit-scrollbar { 
  display: none;
}

.rect .list>.basicCard {
  width: calc(100vw / var(--basc_card_rect_num)) !important;
}

.list>.basicCard {
  width: calc(100vw / var(--basc_card_num));
}
 
.listWrap:hover .side {
  opacity: 1;
}
.side {
  top: 0; 
  width: 50px;
  height: 100%; 
  position: absolute;
  z-index: 10;
  opacity: 0;
  transition: all 0.2s ease-in-out;
}
.left {
  left: 0;
  background-image: linear-gradient(to right,
      white 0,
      rgba(255, 255, 255, 0) 100%);
  will-change: opacity;

  @media (prefers-color-scheme: dark) {
    background-image: linear-gradient(to right,
        black 0,
        rgba(255, 255, 255, 0) 100%);
  }
}
.right {
  right: 0;
  background-image: linear-gradient(to left,
      white 0,
      rgba(255, 255, 255, 0) 100%);
  will-change: opacity;

  @media (prefers-color-scheme: dark) {
    background-image: linear-gradient(to left,
        black 0,
        rgba(255, 255, 255, 0) 100%);
  }
}
  

@media (width > 628px) { 
}

.borderB {
  background: rgba(164, 163, 163, 0.368);
}

.scrolling.listWrap::after {
  opacity: 0;
}
</style>