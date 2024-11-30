<script setup>

const props = defineProps({ 
}); 

const clickFile = (file) =>{ 
  props?.handleClick(file) 
}
</script>
<template>
  <div class="filesArea px-4 text-dark-800">
    <slot name="list"></slot>
  </div>

</template>
<style lang="scss" scoped>


.filesArea {
  display: grid;
  gap: 10px 0;
  // flex-wrap: wrap;
  grid-template-columns: repeat(auto-fill, 160px);
  justify-content: space-around;
}
</style>