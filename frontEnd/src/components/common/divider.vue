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

<style scoped>
.divider {
  height: 1px;
  background-color: #e0e0e02c;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
}
@media (width < 500px) or (height < 500px) {
  .divider {
    margin-top: 0.3rem;
    margin-bottom: 0.3rem 
  }
}
</style> 