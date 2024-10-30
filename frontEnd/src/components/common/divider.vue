<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: true,
  },
});
</script>
<template>
  <div class="divider" v-if="show"></div>
</template>

<style scoped lang="scss">
.divider {
  $space: 1rem;
  height: 1px;
  background-color: #5353532c;
  // margin-top: $space / 2;
  margin-bottom: $space;
}
@media (prefer-color-scheme: dark) {
  .divider {
    background-color: #e0e0e079;
  }
}
@media (width < 500px) or (height < 500px) {
  .divider {
    display: none;
    $space: 0.5rem;
    margin-top: $space;
    margin-bottom: $space;
  }
}
</style> 