<script setup>
import scrollView from "@/viewComponents/scrollView.vue";
import backword from "@/components/common/backword.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import { layoutStore } from "@/stores/layout";
import { computed } from "vue";
import space from "@/components/common/space.vue";
import linkMsg from './linkMsg.vue';
import fileMsg from "./fileMsg.vue";
const layout = layoutStore();

const size = computed(() => {
  return layout.size;
});
const props = defineProps({
  task: {
    type: Object,
    Required: true,
  },
});

const toLink = (event, url) => {
  event.preventDefault();
  window.open(url, "_blank");
};


</script>
<template>
  <div class="msgListView w-full px-6 overflow-x-hidden overflow-y-auto">
    <div class="mb-4" v-for="i in 10" :key="i">
      <div class="" v-for="msg in task?.msgs" :key="msg">
        <!-- getLink --> 
        <linkMsg :msg="msg" v-if="msg.type != 'getFile'"></linkMsg>

        <!-- getFile -->
        <fileMsg :msg="msg" v-else></fileMsg>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/style/variables.scss";

.msgListView {
  background: var(--listBg);
  height: calc(100% - $headerH);
}
 
@media (width >= 1080px) {
  .navWrap {
    display: none;
  }
}
</style>