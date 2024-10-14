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
                    <h1 class="txtDarkPrimary">Tasks</h1>
                </template>
                <template v-slot:content>
                    <div class="h-full">
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
    div {
        // background: white;
    }
}

</style>