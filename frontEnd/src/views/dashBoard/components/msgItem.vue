<script setup>
import { computed } from "vue";
import { layoutStore } from "@/stores/layout";
import fileMsg from "./fileMsg.vue";
const layout = layoutStore();
const size = computed(() => {
  return layout.size;
});

const props = defineProps({
    msg: {
        type: Object,
        Required: true
    }
})
</script>
<template>
  <div class="">
    <div class="flex justify-between items-center flex-wrap">
      <p class="type text-[1.3em] getFile">{{ msg?.type }}</p>
      <text class=" tracking-wider">{{ msg?.time }}</text> 
    </div>
    <div class="filesArea txtDarkSecondary">
      <fileMsg :files="msg?.data" />
    </div>
  </div>
</template>
<style scoped lang="scss"> 
@import "@/style/variables.scss"; 
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
.filesArea {
  display: grid;
  gap: 10px 0;
  // flex-wrap: wrap;
  grid-template-columns: repeat(auto-fill, 180px);
  justify-content: space-around;
}
</style>