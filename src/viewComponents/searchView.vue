<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get, post } from "@/APIS/axiosWrapper.js";
import { layoutStore } from "@/stores/layout";
import gsap from "gsap";
import ScrollView from "@/viewComponents/ScrollView.vue";
import commonScrollHeader from "@/components/commonScrollHeader.vue";
// import { calScroll } from "@/APIS/commonFunc.js"

const props = defineProps(["inputValue"]);

const store = layoutStore();
const showTab = computed(() => store.showTab);
const size = computed(() => store.size);
var gtThreshold = false;
const showTabFlg = computed(() => {
  if (size.value != "small") {
    return !store.showTab;
  } else {
    return true;
  }
});

function calScroll(scrollView, event) {
  const bgColor = "rgb(33 33 33 / 98%)";
  const height = scrollView.scrollTop;
  console.log(height);
  const header = scrollView.querySelector("header");
  const title = header.querySelector("h1");
  const searchBar = scrollView.querySelector("#searchBar");
  if (height > 40) {
    header.style["background"] = bgColor;
    searchBar.style["background"] = bgColor;
    searchBar.style['border-bottom'] = '1px solid lightgray'
    searchBar.style['backdrop-filter'] = 'blur(60px)'
    gsap.to(title, { duration: 0.2, opacity: 1, ease: "power1.inOut" });
    gtThreshold = true;
  } else {
    if (gtThreshold) {
      header.style["background"] = "var(--bg_Primary)";
      searchBar.style["background"] = "var(--bg_Primary)";
      searchBar.style['backdrop-filter'] = ''
      searchBar.style['border-bottom'] = ''
      gsap.to(title, { duration: 0.2, opacity: 0, ease: "power1.inOut" });
      gtThreshold = false;
    }
  }
}
</script>
<template>
  <ScrollView :calScrollFunc="calScroll" :top="true">
    <template v-slot:header>
      <commonScrollHeader
        :title="'搜索'"
        :showTabFlag="showTabFlg"
        :showDivider="false"
      />
    </template>
    <template v-slot:content>
      <div class="w-full h-full trans">
        <div class="w-full px-10 h-8">
          <h1 id="scrollTitle" class="text-2xl">搜索</h1>
        </div>
        <div class="flex flex-col items-center">
          <div
            id="searchBar"
            class="w-full h-12 pt-1 pb-3 px-10 trans flex justify-between"
          >
            <div class="searchWrap flex items-center bg-white rounded-lg">
              <div class="h-2/3 mx-2">
                <img
                  class="w-full h-full"
                  src="/src/assets/icons/search.svg"
                  alt="search"
                />
              </div>
              <input class="h-full pl-2" placeholder="请输入搜索内容" />
            </div>
            <button class="w-8">取消</button>
          </div>
          <div class="w-full px-10">
            <slot></slot>
          </div>
        </div>
      </div>
    </template>
  </ScrollView>
</template>
<style scoped lang="scss">
@import "@/style/variables.scss";

.searchBarWrap {
}
input {
  // background: rgba(211, 211, 211, 0.445);
}
#searchBar {
  display: flex;
  position: sticky;
  top: 0;
  // border-bottom: 1px solid lightgray;
  .searchWrap {
    width: calc(100% - 3rem);
    border-radius: 0.5rem;
    input {
        width: calc(100% - 4rem);
    }
  }
}
</style>