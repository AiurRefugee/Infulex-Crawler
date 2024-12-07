<script setup>
import { ref, computed } from "vue";
import loadImg from "@/components/common/loadImg.vue";
import { useTaskStore } from "@/stores/tasks";
const tasks = useTaskStore();
const props = defineProps({
  file: {
    type: Object,
    default: {},
  },
});
const selectedFiles = computed(() => tasks.selectedFiles);
const selected = computed(() => {
  if (!props.file) return false;
  const { file_id } = props.file;
  return selectedFiles.value[file_id];
});
const selectFile = (event) => {
  event.stopPropagation();
  tasks.switchSelectFile(props.file);
  console.log("select file", event, props.file);
};

// size 为字节数
const calSize = (size) => {
  let res = size;
  let unit = ["B", "KB", "MB", "GB"];
  let index = 0;
  while (res > 1024) {
    res /= 1024;
    index++;
  }
  return res.toFixed(2) + unit[index];
};
</script>
<template>
  <div
    :class="selected ? 'selected' : ''"
    class="fileWrap rounded-lg m-2 pb-2 pt-6 relative"
  >
    <div
      class="selectArea center bg-light-800 rounded-lg absolute"
      @click="selectFile"
    >
      <div class="outside selectedCenter">
        <svg class="icon w-full aspect-square" viewBox="0 0 1024 1024">
          <path
            d="M455.42 731.04c-8.85 0-17.75-3.05-24.99-9.27L235.14 553.91c-16.06-13.81-17.89-38.03-4.09-54.09 13.81-16.06 38.03-17.89 54.09-4.09l195.29 167.86c16.06 13.81 17.89 38.03 4.09 54.09-7.58 8.83-18.31 13.36-29.1 13.36z"
            p-id="4262"
            fill="#ffffff"
          ></path>
          <path
            d="M469.89 731.04c-8.51 0-17.07-2.82-24.18-8.6-16.43-13.37-18.92-37.53-5.55-53.96L734.1 307.11c13.37-16.44 37.53-18.92 53.96-5.55 16.43 13.37 18.92 37.53 5.55 53.96L499.67 716.89c-7.58 9.31-18.64 14.15-29.78 14.15z"
            p-id="4263"
            fill="#ffffff"
          ></path>
        </svg>
      </div>
    </div>
    <div class="center p-2">
      <div class="w-full imgWrap center relative">
        <img
          src="@/assets/icons/fileIcon.svg"
          alt="file"
          v-if="file?.type == 'folder'"
        />
        <loadImg
          class="loadImg"
          v-if="file?.type == 'file'"
          :src="file?.thumbnail"
          :defaultSrc="file?.category == 'image' ? 'src/assets/icons/defaultImage.svg' : 'src/assets/icons/play.svg'"
        >
          <template #default="{ loading }">
            <img class="absolute h-8 aspect-square" src="@/assets/icons/video.svg" alt="file" v-if="file?.category == 'video' && !loading"/>
          </template>
        </loadImg>
        
      </div>
    </div>
    <div class="w-full text-center">
      <p class="filetitle w-full overflow-hidden text-ellipsis px-2 my-1">
        {{ file?.name }}
      </p>
      <p class="size text-sm text-dark-800 opacity-60" v-if="file.size">
        {{ calSize(file.size) }}
      </p>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/style/variables.scss";
.imgWrap {
  aspect-ratio: 16 / 9;
}
.size {
  word-break: break-all;
  overflow-wrap: break-word;
}
.selectArea {
  display: none;
  $size: 25px;
  width: $size;
  aspect-ratio: 1;
  cursor: pointer;
  $space: 5px;
  left: $space;
  top: $space;
}
.icon {
  display: none;
}
.selected {
  background-color: hsla(37, 98%, 66%, 0.307) !important;
}
.selected .icon {
  display: block;
}
.selected .selectArea {
  display: flex !important;
}
.selected .selectedCenter {
  background-color: rgb(255, 150, 38);
}
.selected .outside {
  border: none;
}
.outside {
  $size: 15px;
  aspect-ratio: 1;
  width: $size;
  border-radius: 20px;
  border: 2px solid gray;
}
.outside:hover {
  border: 2px solid rgb(255, 150, 38);
}
.fileWrap {
  cursor: pointer;
}
.fileWrap:hover {
  background-color: $item_hover_color;
}
.fileWrap:hover .selectArea {
  display: flex;
}
img {
  width: 100px;
  aspect-ratio: 1;
  cursor: pointer;
}

.filetitle {
  // word-break: break-all;
  $line-height: 1.2em;
  line-height: $line-height;
  max-height: $line-height * 2;
  -webkit-line-clamp: 2;
}
</style>