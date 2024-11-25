<script setup>
import { computed } from "vue";
import { layoutStore } from "@/stores/layout";
import fileMsg from "./fileMsg.vue";
import fileItem from "./fileItem.vue";
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
    <div class="min-h-8 flex justify-between px-4 items-center flex-wrap">
      <p class="type text-[1.3em] getFile">{{ msg?.type }}</p>
      <text class=" tracking-wider">{{ msg?.time }}</text> 
    </div>  
    <fileMsg>
      <template v-slot:list>
        <fileItem v-for="file in msg?.data" :key="file" :file="file"/>
      </template>
    </fileMsg> 
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

</style>