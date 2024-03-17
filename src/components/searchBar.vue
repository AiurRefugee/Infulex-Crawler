<script setup>
import { ref } from "vue";
const searchContent = ref("");
</script>
<template>
  <div class="searchWrapper flex items-center">
    <input class="searchInput" v-model="searchContent" />
  </div>
</template>
<style scoped lang="scss">
@import "@/style/variables.scss";
$searchHeight: 65%;
$searchBorRadius: 25px;
input {
    background: var(--bg_Primary);
}
.searchWrapper {
  
  height: $searchHeight;
  border-radius: $searchBorRadius;
  transition: $basicTrans;
  border: 2.5px solid var(--primaryColor);
}
.searchInput {
  width: 20vw;
  min-width: 60px;
  height: 80%;
  margin: 0 $searchBorRadius;
  font-size: 15px;
  letter-spacing: 2px;
  border: none;
  transition: $basicTrans;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.searchInput:focus {
  width: var(--filterFull);
}
</style>