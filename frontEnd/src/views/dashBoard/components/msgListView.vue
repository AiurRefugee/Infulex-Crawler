<script setup>
import scrollView from "@/viewComponents/scrollView.vue";
import backword from "@/components/common/backword.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import { layoutStore } from "@/stores/layout";
import { useTaskStore } from "@/stores/tasks";
import { computed } from "vue";
import space from "@/components/common/space.vue";
import msgItem from "./msgItem.vue";
const layout = layoutStore();
const tasks = useTaskStore();
const taskMsgs = computed(() => tasks.selectedTask?.msgs?.filter((msg) => msg.type != "Share_Token Error"));
const size = computed(() => {
  return layout.size;
});


const toLink = (event, url) => {
  event.preventDefault();
  window.open(url, "_blank");
};


</script>
<template>
  <div class="px-2">
    <div class="mb-4" v-for="msg in taskMsgs" :key="msg">
      <msgItem :msg="msg"></msgItem>
    </div>
  </div>
</template>
<style scoped lang="scss">
.msgListView {
  height: calc(100% - 50px);
}

@media (width >=1080px) {
  .navWrap {
    display: none;
  }
}
</style>