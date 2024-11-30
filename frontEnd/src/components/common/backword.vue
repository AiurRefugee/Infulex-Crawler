<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Back",
  },
});
</script>
<template>
  <div class="backword h-full flex items-center">
        <img class="h-[25px] aspect-square" src="@/assets/icons/back.svg"/>
        <p class="text-[1.1em] text-lg whitespace-nowrap">{{ title }}</p>
      </div>
</template>
<style scoped lang="scss">
.backword {
  color: rgb(233 145 73);
}
</style>