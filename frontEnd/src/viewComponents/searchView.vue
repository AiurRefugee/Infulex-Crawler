<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get, post } from "@/apis/axiosWrapper.js";
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
  const normalBgColor = "var(--bg_light_primary)";
  const secBgColor = "var(--bg_light_secondary)";
  const height = scrollView.scrollTop;

  const header = scrollView.querySelector("header");
  const title = header.querySelector("h1");
  const searchBar = scrollView.querySelector("#searchBar");
  if (height > 40) {
    header.style["background"] = secBgColor;
    searchBar.style["background"] = secBgColor;
    searchBar.style['border-bottom'] = '1px solid lightgray'
    searchBar.style['backdrop-filter'] = 'blur(60px)'
    gsap.to(title, { duration: 0.2, opacity: 1, ease: "power1.inOut" });
    gtThreshold = true;
  } else {
    if (gtThreshold) {
      header.style["background"] = normalBgColor
      searchBar.style["background"] = normalBgColor
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
      <div class="w-full h-full trans searchBarWrap">
        <div class="w-full h-10 px-4">
          <h1 id="scrollTitle" class="text-2xl font-bold select-none">搜索</h1>
        </div>
        <div class="flex flex-col items-center">
          <div
            id="searchBar"
            class="w-full h-12 pt-1 pb-3 px-4 trans bg-white flex justify-between"
          >
            <div class="searchWrap flex items-center bg-white rounded-lg">
              <div class="h-2/3 mx-2 flex items-center">
                <img
                  class="h-3/4"
                  src="/src/assets/icons/search.svg"
                  alt="search"
                />
              </div>
              <input class="h-full pl-2" placeholder="请输入搜索内容" />
            </div>
            <button class="w-10 txtDark_Secondary">取消</button>
          </div>
          <div class="w-full pt-2 px-4">
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
  background: var(--bg_light_primary);
}
input {
  // background: rgba(211, 211, 211, 0.445);
}
#searchBar {
  display: flex;
  position: sticky;
  background: var(--bg_light_primary);
  top: 0;
  z-index: inherit;
  // border-bottom: 1px solid lightgray;
  .searchWrap {
    width: calc(100% - 3rem);
    border-radius: 0.5rem;
    // background: #f5f5f5;
    input {
        width: calc(100% - 4rem);
        // background: #f5f5f5;
    }
  }
}
</style>