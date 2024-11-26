<script setup>
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
const props = defineProps(['title'])
</script>
<template>
    <scrollView>
    <template v-slot:header>
      <scrollHeader class="h-[45px]">
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
  $minw: 120px;
  display: grid;
  grid-template-columns: repeat(auto-fill, max(calc(100% / var(--show_all_grid_columns)), $minw));
  grid-gap: 15px 0;
  justify-content: space-around;
  justify-items: center;
}

.showAllGridRect .gridArea{
  $minw: 160px;
  display: grid;
  grid-template-columns: repeat(auto-fit, max(calc(100% / var(--show_all_grid_rect_columns)), $minw));
  justify-content: space-around;
  justify-items: center;
  gap: 15px 0;

}
</style>