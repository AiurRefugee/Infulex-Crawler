<script setup>
import { taskStore } from "@/stores/tasks";
import { computed } from "vue";
import scrollView from "@/viewComponents/scrollView.vue";
import taskOverview from "@/components/taskOverview.vue";
const tasks = taskStore();

const taskPools = computed( () => tasks.taskPools )

</script>
<template>
    <div class="dashBoard flex h-full">
        <div class="tasks h-full">
            <scrollView>
                <template v-slot:headerCenter>
                    <h1 class="txtDarkPrimary select-none">Tasks</h1>
                </template>
                <template v-slot:content>
                    <div class="h-full px-4">
                        <taskOverview v-for="task in taskPools" :key="task" :task="task" />
                    </div>
                </template>
            </scrollView>
        </div>
    </div>
</template>
<style scoped lang="scss"> 
.tasks {
    width: 26vw;
    border-right: 1px solid gray;
    
}
@media (width < 700px) {
    .tasks {
        width: 100vw;
        border-right: none;
    }
}

</style>