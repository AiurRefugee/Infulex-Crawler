<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const showSideBar = ref(false)
</script>
<template>
    <div class="sideBarWrapper" v-if="showSideBar" :style="{translate: showSideBar ? '0 0' : '100% 0'}">
        <div class="mask" :style="{opacity: showSideBar ? '1' : '0'}"></div>
    </div>
    
</template>
<style scoped lang="scss">
@import '@/style/variables.scss';
$sideIndex: 9998;
.sideBarWrapper {
    height: 100dvh;
    width: var(--sideWidth);
    position: fixed;
    z-index: $sideIndex;
    right: 0;
    top: 0;
    transition: $basicTrans;
    background: var(--bg_Primary); 
}
.mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    transition: $basicTrans;
    z-index: calc($sideIndex - 1);
    background: rgba(40, 40, 40, 0.5);
}
</style>