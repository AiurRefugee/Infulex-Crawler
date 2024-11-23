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
const selectedTask = computed(() => tasks.selectedTask);
const size = computed(() => {
  return layout.size;
});


const toLink = (event, url) => {
  event.preventDefault();
  window.open(url, "_blank");
};


</script>
<template>
  <div class="msgListView w-full px-4 pt-2 overflow-x-hidden overflow-y-auto txtDarkPrimary">
    <div class="mb-4" v-for="msg in selectedTask?.msgs" :key="msg">

        <!-- getLink --> 
        <!-- <linkMsg :msg="msg" v-if="msg.type != 'getFile'"></linkMsg> -->

        <!-- getFile -->
        <msgItem :msg="msg"></msgItem>

    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/style/variables.scss";

.msgListView {
  background: var(--list_bg);
  height: calc(100% - $headerH);
}
 
@media (width >= 1080px) {
  .navWrap {
    display: none;
  }
}

</style>