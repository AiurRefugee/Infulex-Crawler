<script setup>
const props = defineProps({
    image: {
        type: String,
        default: ''
    }
})
</script>
<template>
    <div class="brickWrap rouded">
        <img :src="props.image" alt="" class="rounded">
    </div>
</template>