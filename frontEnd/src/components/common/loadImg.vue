<script setup>
import { ref } from 'vue';
const props = defineProps({
    src: {
        type: String,
        default: '',
    },
    defaultSrc: {
        type: String,
        default: '/icons/defaultImage.svg',
    }
})
const loading = ref(true)

</script>
<template>
    <div class="loadImg center w-full h-full rounded-lg overflow-hidden">
        <img 
            :src="src" alt="image"
            :class="loading ? 'hidden' : ''"  
            class="imageArea w-full h-full object-cover rounded-lg"
            @load="loading = false"
        /> 
        <img :src="defaultSrc" alt="" class="imgSize aspect-square" v-if="loading" />
        <slot :loading="loading"></slot>
    </div>
</template>
<style lang="scss" scoped>
@import '@/style/variables.scss'; 
img {
    object-fit: cover;
    // box-shadow: $videoCardBasicBoxShadow;
}
.imgSize {
    height: 60%;
    max-height: 60px;
}
.loadImg {
    border: 1px solid rgba(174, 174, 174, 0.2);
    // box-shadow: $videoCardBasicBoxShadow;
}
</style> 