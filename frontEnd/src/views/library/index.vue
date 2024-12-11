<script setup>
import scrollDetail from "@/components/scrollDetail.vue";
import typeTab from "@/components/common/typeTab.vue";
import { mediasApi } from "@/apis/medias";
import { ref, watch } from "vue";
const params = {
  page: 0,
  pageSize: 20,
  mediaType: "movie",
};

const type = ref("movie");
const scrollDetailRef = ref(null);

const getList = (res) => {
  return res.list.map((item) => item.media);
};

watch(type, (newVal) => {
  params.mediaType = newVal;
  params.page = 0;
  scrollDetailRef.value.clearList();
  scrollDetailRef.value.search();
});
</script>
<template>
  <scrollDetail
    :title="'我的资源'"
    :showTab="true"
    :api="mediasApi.getLibraryList"
    :getResFunc="getList"
    :params="params"
    ref="scrollDetailRef"
  >
    <typeTab class="h-[30px]" v-model:mediaType="type" />
  </scrollDetail>
</template>

<style>
</style>