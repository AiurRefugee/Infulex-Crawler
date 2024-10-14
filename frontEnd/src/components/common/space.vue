<script setup>
const props = defineProps({
  width: {
    type: String,
    default: "100%"
  }
})
</script>
<template>
  <div class="space w-full transSlow" :style="{ width: width }"></div>
</template> 
<style scoped>

</style>