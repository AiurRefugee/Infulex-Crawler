<script lang="ts" setup>
import SideBar from '@/components/sideBar.vue';
</script>
<template>
    <header class="headerWrapper"> 
        <text class="headerTitle">Infulex</text>
        <div class="fixedHead flex justify-center items-center">
            <text class="homeText">Home</text>
            <img class="filterbar h-2/3 cursor-pointer" src="/src/assets/icons/filter.svg"> 
        </div>
    </header> 
    <SideBar></SideBar>
</template>
<style scoped lang="scss">
@import '@/style/variables.scss';
@keyframes fade {
    from {
        background: transparent;
    }
    to {
        background: white;
    }
}
.headerWrapper {
    margin: 5px 0;
    width: 100vw; 
    display: flex;
    align-items: center;  
    // padding-left: var(--leftSpace);
    background: transparent;  
    height: 40px;
    font-weight: bolder;
    color: var(--textColor_Primary);
    .headerTitle {
        font-size: 2.5rem;
        margin-left: var(--leftSpace);
        line-height: 4rem;
        letter-spacing: 0.1rem;
    }
    .fixedHead { 
        width: 100vw;
        height: 40px;
        font-size: 30px;
        position: fixed;
        z-index: 9999;
        fill: var(--primaryColor);
        top: 0;  
        background: rgb(var(--baseColor), var(--baseColor), var(--baseColor), var(--headerOpacity)); 
        .homeText {
            opacity: var(--headerOpacity)
        }
        .filterbar {
            right: var(--leftSpace);
            position: absolute;
        } 
    }
}

</style>