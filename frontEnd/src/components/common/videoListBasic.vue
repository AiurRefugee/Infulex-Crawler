<script setup>
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

onMounted(() => {});
</script>
<template>
  <div class="listHead px-4 flex justify-between items-center">
    <h1 class="listTitle h-[1.5em] text-[1.2em] font-bold txtDarkPrimary">
      {{ title || "--" }}
    </h1>
    <slot name="showAll"></slot>
  </div>
  <!-- <div class="listWrap relative" :class="scrolling ? 'scrolling' : ''"> -->
  <div
    ref="list"
    class="list flex pl-4 justify-stretch items-start overflow-x-auto snap-x"
    @scroll="calFading"
  >
    <slot
      name="card"
      class=""
      :media="media"
      v-for="media in list"
      :key="media"
    >
    </slot>
  </div>
  <!-- </div> -->
</template>
<style lang="scss" scoped>
::-webkit-scrollbar {
  position: relative;
  z-index: 9999;
  display: none;
}

.listWrap::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 100%;
  transition: all 0.2s ease-in-out;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0,
    #fff 100%
  );
  will-change: opacity;
  @media (prefers-color-scheme: dark) {
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0,
      #000 100%
    );
  }
}
.borderB {
  background: rgba(164, 163, 163, 0.368);
}
.scrolling.listWrap::after {
  opacity: 0;
}
</style>