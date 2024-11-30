<script setup>
import { computed } from "vue";
import { layoutStore } from "@/stores/layout";
import msgGrid from "./msgGrid.vue";
import linkItem from "./linkItem.vue";
import fileItem from "./fileItem.vue";
const layout = layoutStore();
const size = computed(() => {
  return layout.size;
});

const props = defineProps({
  msg: {
    type: Object,
    Required: true,
  },
});
</script>
<template>
  <div class="min-h-8 flex justify-between px-4 items-center flex-wrap">
    <p class="type text-[1.3em] getFile">{{ msg?.type }}</p>
    <text class="tracking-wider">{{ msg?.time }}</text>
  </div>
  <msgGrid v-if="msg.type == 'GET Links'">
    <template #list>
      <linkItem
        v-for="item in msg?.data" 
        :linkMsg="item"
        :key="item" 
      /> 
    </template>
  </msgGrid>
  <msgGrid v-if="msg.type == 'GET File' || msg.type == 'GET Video'">
    <template #list>
      <fileItem v-for="file in msg?.data" :key="file" :file="file" />
    </template>
  </msgGrid>
</template>
<style scoped lang="scss">

.msg {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  // height: 2em;
}

.type {
  align-items: center;
  font-weight: bold;
}

.getFile {
  color: #579cd6;
}
</style>