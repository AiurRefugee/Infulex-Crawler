<script setup>
const props = defineProps(["genreNumVar", "tags"])
</script>
<template>
  <button
    class="genreCard trans flex justify-center items-center"
    :style="{
        width: `calc(100% / ${genreNumVar})`,
    }"
    v-for="tag in tags"
    :key="tag"
  >
    <div class="genreContent" :style="{ background: `${tag.background}` }">
      <div class="buttonText">{{ tag.name }}</div>
    </div>
  </button>
</template>
<style lang="scss" scoped>
@import "@/style/variables.scss";
.genreCard {
//   width: calc(100% / var(--genreNum));
  flex-shrink: 0;
  // padding: var(--classMargin);
  padding: var(--genreSpace);
  flex-shrink: 0;
  padding-left: 0;
  box-shadow: none;
  background-size: cover;

  aspect-ratio: 2 / 1;

  background-position: center;
  background-size: cover;
  transition: $basicTrans;
}
.genreContent {
  width: 100%;
  height: 100%;
  border-radius: var(--priRadius);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    to right,
    rgba(214, 55, 34, 0.7) 0,
    rgba(130, 22, 126, 0.7) 100%
  );
  // url("src/assets/imgs/ave2.jpg");
}
.buttonText {
  font-size: var(--genreFontSize);
  color: white;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: clip;
  overflow: hidden;
  text-align: center;
  letter-spacing: 8px;
}
</style>