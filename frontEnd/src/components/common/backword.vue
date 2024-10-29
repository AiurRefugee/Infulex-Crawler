<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Back",
  },
});
</script>
<template>
  <div class="backword pl-4 flex h-[45px] items-center cursor-pointer">
    <svg 
      viewBox="0 0 1024 1024"  
      class="h-[20px] aspect-square rotate-180"
    >
      <path
        d="M801.548285 510.271032L301.254151 1010.360574c-18.242732 18.242732-47.73799 18.106338-65.844327-0.306887a47.226511 47.226511 0 0 1 0.272788-66.389904l433.358652-433.154061L235.784908 80.356335A47.192413 47.192413 0 0 1 235.307528 13.966431 46.30585 46.30585 0 0 1 301.151856 13.454952l500.396429 496.81608z"
        fill="orange" 
        p-id="4213"
      ></path>
    </svg>
    <h1 class="text-xl pl-2 whitespace-nowrap">{{ title }}</h1>
  </div>
</template>
<style scoped lang="scss">
.backword {
  color: orange;
}
</style>