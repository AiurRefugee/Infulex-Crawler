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
</script>
<template>
  <div class="" v-if="msg.type == 'getFile'">
    <div class="flex items-center flex-wrap">
      <p class="type getFile">getFile</p>

      <div class="w-full flex justify-between items-center">
        <span>
          <svg class="typeIcon" viewBox="0 0 1024 1024">
            <path
              fill="#8a8a8a"
              d="M861.47 120.9h-246c-13.11 0-25.32 5.43-34.37 14.92l-58.79 62.41c-9.95 10.4-23.52 16.28-37.53 16.28H156.92c-51.1 0-92.7 43.86-92.7 98.13v468.95c0 54.27 41.6 98.13 92.7 98.13h704.55c51.1 0 92.7-43.86 92.7-98.13V219.03c-0.44-53.82-42.05-98.13-92.7-98.13zM136.12 313.09c0-12.21 9.04-22.16 20.8-22.16h358.15c14.47 0 28.04-5.88 37.53-16.28l62.41-66.48c6.78-7.24 15.83-10.85 25.78-10.85h220.68c11.31 0 20.8 9.95 20.8 22.16v562.56c0 12.21-9.04 22.16-20.8 22.16h-705c-11.31 0-20.8-9.95-20.8-22.16V313.09h0.45z"
            />
            <path
              fill="#8a8a8a"
              d="M257.32 744.95h503.32c19.9 0 36.18-17.18 36.18-37.99s-16.28-37.99-36.18-37.99H257.32c-19.9 0-36.18 17.18-36.18 37.99s16.28 37.99 36.18 37.99z"
            />
          </svg>
          <text>{{ msg?.name }}</text>
        </span>
        <text>{{ msg?.time }}</text>
      </div>
    </div>
    <div class="files pl-[1.5em]">
      <p v-for="file in msg.data" :key="file">
        <svg class="typeIcon" viewBox="0 0 1024 1024">
          <path
            fill="#8a8a8a"
            d="M861.47 120.9h-246c-13.11 0-25.32 5.43-34.37 14.92l-58.79 62.41c-9.95 10.4-23.52 16.28-37.53 16.28H156.92c-51.1 0-92.7 43.86-92.7 98.13v468.95c0 54.27 41.6 98.13 92.7 98.13h704.55c51.1 0 92.7-43.86 92.7-98.13V219.03c-0.44-53.82-42.05-98.13-92.7-98.13zM136.12 313.09c0-12.21 9.04-22.16 20.8-22.16h358.15c14.47 0 28.04-5.88 37.53-16.28l62.41-66.48c6.78-7.24 15.83-10.85 25.78-10.85h220.68c11.31 0 20.8 9.95 20.8 22.16v562.56c0 12.21-9.04 22.16-20.8 22.16h-705c-11.31 0-20.8-9.95-20.8-22.16V313.09h0.45z"
          />
          <path
            fill="#8a8a8a"
            d="M257.32 744.95h503.32c19.9 0 36.18-17.18 36.18-37.99s-16.28-37.99-36.18-37.99H257.32c-19.9 0-36.18 17.18-36.18 37.99s16.28 37.99 36.18 37.99z"
          />
        </svg>
        <text>{{ file }}</text>
      </p>
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
.getFile {
  color: #579cd6;
}
</style>