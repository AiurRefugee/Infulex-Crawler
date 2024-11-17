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
      <div class="showAllGridRect px-4">
         <slot></slot>
      </div>
    </template>
  </scrollView>
</template>