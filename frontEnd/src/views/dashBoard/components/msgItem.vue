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
  <div class="min-h-8 flex px-2 justify-between items-center flex-wrap"> 
    <div class="w-full flex justify-between items-center gap-4">
      <p class="type pr-4 text-[1.3em] getFile">{{ msg?.type }}</p>
      <a 
        v-if="msg?.link" 
        class="msgLink text-dark-900 opacity-90 underline overflow-hidden whitespace-nowrap text-ellipsis" 
        :href="msg?.link" target="_blank"
      >{{ layout.size == 'small' ? msg.link.slice(22, -1) : msg.link }}</a>
    </div>
    <div class="w-full flex justify-end items-center gap-4">
    </div>
    
    
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
  white-space: nowrap;
  align-items: center;
  font-weight: bold;
}
.msgLink:hover {
  color: #26679c;
}
.getFile {
  color: #579cd6;
}
</style>