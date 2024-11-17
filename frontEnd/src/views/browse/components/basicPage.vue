<script setup>
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
const props = defineProps(['title'])
</script>
<template>
    <scrollView>
    <template v-slot:header>
      <scrollHeader>
        <template v-slot:center>
          <h1 class="txtDarkPrimary select-none text-xl font-bold">{{ title }}</h1>
        </template>
      </scrollHeader>
    </template>
    <template v-slot:content>
      <h1 class="px-4 text-[1.6em] font-bold mb-2 txtDarkPrimary">{{ title }}</h1>
      <div class="gridArea px-4">
         <slot></slot>
      </div>
      <div class="h-20"></div>
    </template>
  </scrollView>
</template>
<style lang="scss" scoped>
.showAllGrid .gridArea{
  display: grid;
  grid-template-columns: repeat(var(--showAllGridColumns), calc(100% / var(--showAllGridColumns)));
}

.showAllGridRect .gridArea{
  display: grid;
  grid-template-columns: repeat(var(--showAllGridRectColumns), calc(100% / var(--showAllGridRectColumns)));
  justify-content: center;

}
</style>