<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, watch, nextTick, computed } from "vue";
import videoCardBasic from "@/components/cards/videoCardBasic.vue";
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import backword from "@/components/common/backword.vue";
import { tmdbApi } from "@/apis/tmdbApi.js";
import { layoutStore } from "@/stores/layout";
const route = useRoute();
const router = useRouter();
const { title } = route.params;
const { apiName } = route.query;
const layout = layoutStore();
const list = ref([]);
const scrollTop = ref(0);
const scrollWrap = ref(null);
const queryParam = {
  page: 0,
  language: "zh-CN",
};
const windowHeight = window.innerHeight;
let maxHeight = 0,
  calHeightTimeout = null,
  canSearch = true;
let totalPage = 10;

const calHeight = () => {
  maxHeight = scrollWrap.value.scrollHeight;
  console.log(maxHeight);
};

const search = () => {
  if (!canSearch) return;
  queryParam.page += 1
  tmdbApi[apiName](queryParam).then(async (res) => {
    list.value = list.value.concat(res.results);
    totalPage = res.total_pages;
    await nextTick()
    canSearch = true 
    if (lastCardCanBeSeen()) {
        search()
    }
  }).catch((err) => {
    console.log('search err', err);
  })
};

watch(scrollTop, async (newVal) => {
  console.log("scrollTop", newVal, maxHeight);
  await nextTick();
  calHeight();
  if (newVal + windowHeight > maxHeight - maxHeight / 5) {
    search();
  }
});

const lastCardCanBeSeen = () => {
  const lastCard = document.querySelector(".basicCard:last-child");
  console.log(lastCard);
  if (lastCard) {
    const lastCardRect = lastCard.getBoundingClientRect();
    return lastCardRect.top < windowHeight;
  }
  return false;
};

onMounted(() => {
  if (layout.size == "small") {
    layout.setTabIconVisible(false);
  }
  search();
});
</script>
<template>
  <scrollView v-model:scrollTopModel="scrollTop">
    <template #header>
      <scrollHeader :show="true" class="h-[45px]">
        <template #left>
          <backword @click="router.back()" />
        </template>
        <template #center>
          <h1 class="text-dark-900 select-none text-xl font-bold">
            {{ title }}
          </h1>
        </template>
      </scrollHeader>
    </template>
    <template #content>
      <div ref="scrollWrap">
        <div class="gridArea">
          <videoCardBasic
            :toDetail="true"
            :media="media"
            v-for="media in list"
            :key="media"
          />
        </div>
      </div>
    </template>
  </scrollView>
</template>
<style scoped>
</style>