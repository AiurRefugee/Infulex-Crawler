<script setup>
import scrollView from "@/viewComponents/scrollView.vue";
import backword from "@/components/common/backword.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import { layoutStore } from "@/stores/layout";
import { computed } from "vue";
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
        <p class="msg" v-if="msg.type == 'getLink'">
          <span class="type getLink">
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
            <text>getLink</text>
          </span>
          <span class="link">
            <a
              class="underline italic"
              target="black"
              :href="'https://' + msg.data"
              >{{ msg.data }}</a
            >
          </span>
        </p>

        <!-- getFile -->
        <div class="" v-if="msg.type == 'getFile'">
          
          <div class="files">
            <div class="type flex-shrink-0 getFile">
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
              <text>getFile</text>
            </div>  
            <p v-for="file in msg.data" :key="file">{{ file }}</p>
          </div>
        </div>

        <!-- geetVideo -->
        <p class="msg" v-if="msg.type == 'getVideo'">
          <span class="type getVideo">
            <svg class="typeIcon" viewBox="0 0 1024 1024">
              <path
                fill="#707070"
                d="M876.8 150.4H147.2C64 150.4 0 217.6 0 297.6V736c0 80 64 147.2 147.2 147.2h732.8c80 0 147.2-64 147.2-147.2V297.6C1024 217.6 960 150.4 876.8 150.4zM928 761.6c0 12.8-9.6 25.6-25.6 25.6H121.6c-12.8 0-25.6-9.6-25.6-25.6V272c0-12.8 9.6-25.6 25.6-25.6h780.8c12.8 0 25.6 9.6 25.6 25.6v489.6z m-284.8-272l-153.6-108.8c-22.4-16-60.8-25.6-73.6 12.8v252.8c22.4 16 54.4 25.6 73.6 9.6l153.6-108.8c19.2-16 19.2-41.6 0-57.6z"
              />
            </svg>
            <text>getVideo</text>
          </span>
          <span class="link">
            <text>{{ msg.data }}</text>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/style/variables.scss";
$typeW: min(30vw, 110px);
$cellHeight: 2rem;
.msgListView {
  background: #242424;
  height: calc(100% - $headerH);
}
.msg {
  display: flex;
  align-items: center;
  width: 100%;
  height: 2em;
}
.link {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.type {
  display: inline-flex;
  flex-shrink: 0;
  width: $typeW;
  height: $cellHeight;
  align-items: center;
  font-size: 1.1rem;
  font-weight: bold;
  // font-style: italic;
}
.getFile {
  color: #579cd6;
}
.typeIcon {
  display: inline-block;
  width: 1em;
  height: 1em;
  aspect-ratio: 1;
  margin-right: 0.5em;
}
.files {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, $typeW); 
  align-content: center;
  align-items: center;
  overflow: hidden;
  gap: 1em 0; 
  p {
    width: 100%;
    height: $cellHeight;
    line-height: 2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.getLink {
  color: #b5bb47;
}
.getVideo {
  color: #4ec9b1;
}
@media (width >= 1080px) {
  .navWrap {
    display: none;
  }
}
</style>