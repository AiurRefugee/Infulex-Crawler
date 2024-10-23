<script setup>
import { computed } from "vue";
import { layoutStore } from "@/stores/layout";
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

const resize = (link) => {
  if (size.value == 'small') {
    return link.replace('www.aliyundrive.com', '...')
  }
}
</script>
<template>
  <div class="msg max-w-full flex justify-between">
    <div class="type" :class="msg.type">
      <text v-if="msg?.type == 'getLink'">getLink</text>
      <text v-if="msg?.type == 'getVideo'">getVideo</text>
    </div>
    <div class="w-full pl-[1.5em] flex justify-between gap-4">
      <span class="link overflow-hidden" v-if="msg?.type == 'getLink'">
        <svg class="typeIcon" viewBox="0 0 1024 1024">
          <path
            d="M861.866667 164.266667c-87.466667-87.466667-230.4-89.6-320-2.133334l-68.266667 68.266667c-12.8 12.8-12.8 32 0 44.8s32 12.8 44.8 0l68.266667-68.266667c64-61.866667 166.4-61.866667 230.4 2.133334 64 64 64 168.533333 2.133333 232.533333l-117.333333 119.466667c-34.133333 34.133333-81.066667 51.2-128 49.066666-46.933333-4.266667-91.733333-27.733333-119.466667-66.133333-10.666667-14.933333-29.866667-17.066667-44.8-6.4-14.933333 10.666667-17.066667 29.866667-6.4 44.8 40.533333 53.333333 100.266667 87.466667 166.4 91.733333h17.066667c59.733333 0 119.466667-23.466667 162.133333-68.266666l117.333333-119.466667c83.2-89.6 83.2-234.666667-4.266666-322.133333z"
            fill="#8a8a8a"
          />
          <path
            d="M505.6 750.933333l-66.133333 68.266667c-64 61.866667-166.4 61.866667-230.4-2.133333-64-64-64-168.533333-2.133334-232.533334l117.333334-119.466666c34.133333-34.133333 81.066667-51.2 128-49.066667 46.933333 4.266667 91.733333 27.733333 119.466666 66.133333 10.666667 14.933333 29.866667 17.066667 44.8 6.4 14.933333-10.666667 17.066667-29.866667 6.4-44.8-40.533333-53.333333-100.266667-87.466667-166.4-91.733333-66.133333-4.266667-130.133333 19.2-177.066666 66.133333l-117.333334 119.466667c-85.333333 89.6-85.333333 234.666667 2.133334 322.133333 44.8 44.8 102.4 66.133333 162.133333 66.133334 57.6 0 115.2-21.333333 160-64l66.133333-68.266667c12.8-12.8 12.8-32 0-44.8-14.933333-10.666667-34.133333-10.666667-46.933333 2.133333z"
            fill="#8a8a8a"
          />
        </svg>
        <a
          class="underline italic"
          target="black"
          :href="'https://' + msg.data"
          >{{ resize(msg.data) }}</a
        >
      </span>
      <span class="link overflow-hidden" v-if="msg?.type == 'getVideo'">
        <svg class="typeIcon" viewBox="0 0 1024 1024">
          <path
            fill="#707070"
            d="M876.8 150.4H147.2C64 150.4 0 217.6 0 297.6V736c0 80 64 147.2 147.2 147.2h732.8c80 0 147.2-64 147.2-147.2V297.6C1024 217.6 960 150.4 876.8 150.4zM928 761.6c0 12.8-9.6 25.6-25.6 25.6H121.6c-12.8 0-25.6-9.6-25.6-25.6V272c0-12.8 9.6-25.6 25.6-25.6h780.8c12.8 0 25.6 9.6 25.6 25.6v489.6z m-284.8-272l-153.6-108.8c-22.4-16-60.8-25.6-73.6 12.8v252.8c22.4 16 54.4 25.6 73.6 9.6l153.6-108.8c19.2-16 19.2-41.6 0-57.6z"
          />
        </svg>
        <a
          class="underline italic"
          target="black"
          :href="'https://' + msg.data"
          v-if="msg.type == 'getLink'"
        >
          {{ resize(msg.data) }}
        </a>
        <text v-else>{{ msg.data }}</text>
      </span>
      <span class="whitespace-nowrap text-center">{{ msg.time }}</span>
    </div>
  </div>
</template>
<style scoped lang="scss">

.msg {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  // height: 2em;
}
.link {
  width: max-content;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.getLink {
  color: #b5bb47;
}

.getVideo {
  color: #4ec9b1;
}
</style>