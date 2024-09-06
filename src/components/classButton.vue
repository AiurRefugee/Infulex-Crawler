<script setup>
const props = defineProps(["genreClass", "tag"])
</script>
<template>
  <button
    :class="['trans', 'flex', 'justify-center', 'items-center', genreClass]"
    :style="{ 
    }"  
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