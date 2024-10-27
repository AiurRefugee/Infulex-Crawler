<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router"; 
import { onMounted } from "vue";


const props = defineProps({
  "card": {
    Required: true
  },
  "imageSrcPrefix": {
    Required: false,
    default: ''
  },
    "title": {
        Required: false,
        default: '--'
    },
    "list": {
        Required: true,
        default: ['']
    }
});

const router = useRouter();  
const scrolling = ref(false)

function toAll() { 
    if (props.showAllPath) {
        router.push(props.showAllPath)
    } else {

    } 
}

const calFading = (e) => {
  console.log(e.target.scrollLeft)
  if (e.target.scrollLeft > 10) {
    scrolling.value = true
  } else {
    scrolling.value = false
  }

}

onMounted( () => { 
})
</script>
<template>
  <div ref="listWrap" class="listWrapper">
    <div class="listHead px-4 flex justify-between items-center">
      <h1 class="listTitle text-xl font-bold py-2 txtDarkPrimary">{{ title || "--" }}</h1>
      <button class="showAllButton font-medium text-orange-400" @click="toAll">查看全部</button>
    </div>
    <div class="listWrap relative" :class="scrolling ? 'scrolling' : ''">
      <div 
        ref="list" 
        class="list flex pl-4 justify-stretch items-start overflow-x-auto"  
        @scroll="calFading"
      > 
        <component :is="card" :imageSrcPrefix="imageSrcPrefix" :media="media" v-for="media in list" :key="media"/>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.listWrap::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 5vw;
  height: 100%; 
  transition: all 0.2s ease-in-out;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0, #fff 100%);
  will-change: opacity;
}
.scrolling.listWrap::after {
  opacity: 0;
}
</style>