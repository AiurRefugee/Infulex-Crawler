<script setup>
import { ref, computed } from "vue";
import { useTaskStore } from "@/stores/tasks";
import msgGrid from "./msgGrid.vue";
const tasks = useTaskStore();
const props = defineProps({
  links: {
    type: Object,
    default: [],
  },
}); 
</script>
<template>
   <msgGrid>
        <template #list>
            <div class="flex flex-col gap-2">
                <div v-for="link in links" :key="link.id" class="flex gap-2 items-center">
                    <a :href="link.url" target="_blank" class="text-blue-500">{{ link.name }}</a> 
                </div>
            </div>
        </template>
   </msgGrid>
</template>
<style scoped lang="scss">

</style>