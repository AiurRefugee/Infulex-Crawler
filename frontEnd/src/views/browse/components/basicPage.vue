<script setup>
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import { onMounted, computed } from "vue";
import { layoutStore } from "@/stores/layout";
const layout = layoutStore();
const size = computed(() => layout.size);
const props = defineProps(["title"]);
onMounted(() => {
  if (size.value == 'small') {
    layout.setTabIconVisible(false)
  }
})
</script>
<template>
  <scrollView class="bg-light-900">
    <template v-slot:header>
      <scrollHeader :show="true" class="h-[45px]">
        <template #left>
          <slot name="back"></slot>
        </template>
        <template #center>
          <h1 class="txtDarkPrimary select-none text-xl font-bold">
            {{ title }}
          </h1>
        </template>
      </scrollHeader>
    </template>
    <template #content> 
      <div class="gridArea">
        <slot></slot>
      </div>
      <div class="h-20"></div>
    </template>
  </scrollView>
</template>
<style lang="scss" scoped>
$gap: 0.5rem;
.gridArea {
  $minw: 120px;
  display: grid; 
  padding: 0 min(2%, 1rem);
  grid-template-columns: repeat(
    var(--show_all_grid_columns),
    calc(calc(100% - $gap * (var(--show_all_grid_columns) - 1)) / var(--show_all_grid_columns))
  );
  grid-gap: $gap 0;
  justify-content: space-around;
  justify-items: center;
}

.rect .gridArea {
  $minw: 160px;
  display: grid;
  grid-template-columns: repeat(
    var(--show_all_grid_rect_columns),
    calc(calc(100% - $gap * (var(--show_all_grid_rect_columns) - 1)) / var(--show_all_grid_rect_columns))

  );
  justify-content: space-around;
  justify-items: center;
  gap: 15px 0;
}
</style>