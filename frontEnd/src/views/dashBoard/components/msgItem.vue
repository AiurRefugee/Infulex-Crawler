<script setup>
import { computed } from "vue";
import { layoutStore } from "@/stores/layout";
import msgGrid from "./msgGrid.vue";
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
      <a 
        v-for="item in msg?.data" 
        :key="item" 
        :class="item?.status == 'failed' ? 'failed' : 'normal'"
        class="linkItem rounded-lg min-h-24 text-dark-700 opacity-80 overflow-hidden text-ellipsis" 
        :href="item?.link" target="_blank"
      >{{ item?.link }}</a>
    </template>
  </msgGrid>
  <msgGrid v-if="msg.type == 'GET File' || msg.type == 'GET Video'">
    <template #list>
      <fileItem v-for="file in msg?.data" :key="file" :file="file" />
    </template>
  </msgGrid>
</template>
<style scoped lang="scss">
@import "@/style/variables.scss";
.normal {
  color: #56b725;
  background-color: rgb(240 249 235 / 50%);
}
.normal:hover {
  background-color: hsl(from $item_normal_color h s l/  0.1);
}
.failed {
  color: hsl(350.36deg 88.74% 45.54%);
  background-color: rgba(232, 210, 210, 0.5);
}
.linkItem {
  $padding: 5px;
  $margin: 3px;
  word-break: break-all;
  overflow-wrap: anywhere;
  padding: $padding 2 * $padding;
  margin: $margin;
  // background-color: $item_hover_color;
}
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