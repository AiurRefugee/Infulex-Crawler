<script setup>
import { ref } from "vue";
import addSvg from '@/assets/icons/add.svg'
import sendSvg from '@/assets/icons/send.svg'

const searchText = ref("");
const sites = [ 
  {
    name: "https://cdn.yiso.fun/",
    logo: "https://cdn.yiso.fun/static/img/logo.7101c44.png",
    search: (name) => {
        console.log(this)
        return name + 'info?searchKey=' + searchText.value + '&from=ali'
    }
  },
];

const search = () => {
    if (searchText.value) {
        for (let site of sites) {
            window.open(site.search(site.name), '_blank')
        }
    }
}
</script>
<template>
  <div class="w-full home overflow-hidden bg-light-900">
    <div class="h-1/4"></div>
    <div class="w-full center overflow-auto hideScroll">
      <ul class="sites px-10 flex items-center gap-[10%] text-dark-500">
        <li v-for="site in sites" :key="site.name">
          <img class="m-auto mb-2 h-16 aspect-square" :src="site.logo" />
          <!-- <p class="max-w-[120px] text-center overflow-hidden whitespace-pre break-words">{{ site.name }}</p> -->
        </li>
        <li>
          <img
            class="m-auto h-10 sel aspect-square"
            :src="addSvg"
          />
          <!-- <p class="h-[2em]"></p> -->
        </li>
      </ul>
    </div>
    <div class="h-5 center"></div>
    <div class="w-full center">
      <div class="inputBar h-12 px-5 center rounded-full">
        <input
          v-model="searchText"
          class="w-full h-full border-none outline-none"
          placeholder="搜索"
          type="text"
          @keydown.enter="search"
        />
        <img class="h-2/3" :src="sendSvg" @click="search"/>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.home {
  --max_w: 50vw;
  img {
    cursor: pointer;
  }
}
.sites {
    max-width: var(--max_w); 
    li {
        flex-shrink: 0;
    }
    p {
        height: 2.2em;
        line-height: 1.1em;
        white-space: break-spaces;
        word-break: break-all;
    }
}
.inputBar {
  width: var(--max_w);
  overflow: hidden;
  border: 2px solid rgb(242, 166, 24);
}
@media (width < 500px) {
  .home {
    --max_w: 90vw;
  }
}
</style>