<script setup>
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import backword from "@/components/common/backword.vue";

import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, watch, nextTick, computed } from "vue";
import videoCardBasic from "@/components/cards/videoCardBasic.vue";

import { mediasApi } from "@/apis/medias.js";
import { layoutStore } from "@/stores/layout";
const route = useRoute();
const router = useRouter();
const { mediaType } = route.params;
const { sortBy, title } = route.query;
const layout = layoutStore();
const scrollTop = ref(0);
const scrollWrap = ref();
const list = ref([]);
const sortByObj =  {}
sortByObj[sortBy] = -1
const queryParam = {
  page: 0,
  pageSize: 20,
  sortBy: sortByObj
};

let totalPage = 1,
  canSearch = true;

watch(scrollTop, async (newVal) => {
  await nextTick();
  calHeight();
  if (newVal + windowHeight > maxHeight - maxHeight / 5) {
  }
});

const getDetail = () => {
  if (queryParam.page == totalPage) return;
  canSearch = false;
  queryParam.page += 1;
  mediasApi.getFavoriteList(mediaType, queryParam).then(async (res) => {
    list.value = list.value.concat(res.data);
    totalPage = res.totalPage
    canSearch = true;
    if (lastCardCanBeSeen()) {
      getDetail();
    }
  });
};

const calHeight = () => {
  maxHeight = scrollWrap.value.scrollHeight;
  console.log(maxHeight);
};

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
  layout.setTabIconVisible(false);
  getDetail();
});
</script>
<template>
  <scrollView v-model:scrollTopModel="scrollTop">
    <template #header>
      <scrollHeader :show="true" class="h-[45px]">
        <template #left>
          <backword :title="'我的收藏'" @click="router.back()" />
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
            :mediaType="mediaType"
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