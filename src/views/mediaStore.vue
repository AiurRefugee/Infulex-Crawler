<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from "vue-router";
import { get, post } from "@/APIS/axiosWrapper.js";
import { layoutStore } from "@/stores/layout";
import gsap from 'gsap'
import ScrollView from "@/viewComponents/ScrollView.vue";
import commonScrollHeader from "@/components/commonScrollHeader.vue";

const layout = layoutStore();
const size = computed(() => layout.size); 

</script>
<template>
    <div class="w-full h-full">
        <ScrollView :title="媒体库">
            <div class="w-full">
                
            </div>
        </ScrollView>
    </div>
</template>
<style scoped lang="scss">
    
</style>