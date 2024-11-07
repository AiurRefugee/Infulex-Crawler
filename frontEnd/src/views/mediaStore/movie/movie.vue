<script setup>
import { onMounted, ref, computed, watch, provide } from "vue";
import { useRouter, useRoute } from "vue-router";
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import backword from "@/components/common/backword.vue";
import creditCard from "@/components/cards/creditCard.vue";
import videoListBasic from "@/components/common/videoListBasic.vue";
import videoCardBasic from "@/components/cards/videoCardBasic.vue";

import { infulexApi } from "@/APIs/infulex.js";
import { toDetail } from "@/computeFunc/index.js";

const router = useRouter();
const defaultArray = ["", "", "", "", "", "", "", "", "", ""];
const favoriteList = ref(defaultArray);

const getFavoriteList = async () => {
    favoriteList.value = await infulexApi.getFavoriteList("movie"); 
};

onMounted(() => {
  getFavoriteList();
});

</script>
<template>
  <scrollView>
    <template v-slot:header>
      <scrollHeader class="fixed top-0 z-10">
        <template v-slot:center>
          <h1 class="font-bold text-[1.2em] txtDarkPrimary whitespace-nowrap">
            {{ mediaTitle }}
          </h1>
        </template>
      </scrollHeader>
    </template>
    <template v-slot:content>
      <h1 class="px-4 text-[1.6em] font-bold mb-2 txtDarkPrimary">电影</h1>
      <videoListBasic :list="favoriteList" :title="'我的收藏'">
        <template #card="{ media }">
          <videoCardBasic
            :media="media" 
            :mediaType="'movie'"
            @click="toDetail(router, media, 'movie')"
          />
        </template>
      </videoListBasic>
    </template>
  </scrollView>
</template>