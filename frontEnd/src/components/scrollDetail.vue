<script setup> 
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, watch, nextTick, computed } from 'vue' 
import videoCardBasic from '@/components/cards/videoCardBasic.vue';
import scrollView from '@/viewComponents/scrollView.vue';
import scrollHeader from '@/components/common/scrollHeader.vue';
import backword from '@/components/common/backword.vue';
import { layoutStore } from "@/stores/layout";

const router = useRouter()
const layout = layoutStore();

const props = defineProps({
    params: {
        type: Object,
        Required: true
    },
    api: {
        type: Function,
        Required: true
    }, 
    title: {
        type: String,
        Required: true
    },
    showTab: {
        type: Boolean,
        default: false
    },
    getResFunc: {
        type: Function,
        default: (res) => res
    }
})

const list = ref([]) 
const scrollTop = ref(0)
const scrollWrap = ref(null) 

const windowHeight = window.innerHeight
let maxHeight = windowHeight, calHeightTimeout = null, canSearch = true
let totalPage = 10, tvTotalPage = 10

const calHeight = () => {
    maxHeight = scrollWrap.value.scrollHeight
    console.log(maxHeight)
    
}

const search = async () => {
    const api = props.api
    const params = props.params
    if (!canSearch) return
    if (params.page >= totalPage) return;
    canSearch = false  
    params.page += 1
    api(params).then(async res => {
        const resList = props.getResFunc(res)
        totalPage = res.totalPage
        list.value = list.value.concat(resList)
        canSearch = true
        if (lastCardCanBeSeen()) {
            search()
        }
    }).catch( err => {
        canSearch = true
        console.log('discover err', err)
    })
}

const clearList = () => {
    canSearch = true
    list.value = []
}

const lastCardCanBeSeen = () => {
    const lastCard = document.querySelector('.basicCard:last-child')
    console.log(lastCard)
    if (lastCard) {
        const lastCardRect = lastCard.getBoundingClientRect()
        return lastCardRect.top < windowHeight
    }
    return false
}

const init = async () => { 
    const params = props.params
    if (params?.page == 0) {
        search()
    }
}


watch(scrollTop, async (newVal) => { 
    await nextTick()
    calHeight()
    if (newVal + windowHeight > maxHeight - windowHeight / 2) {
        search()
    }
})

defineExpose({
    clearList,
    search
})

onMounted( () => {
    // layout.setTabIconVisible(false)
    init()
})
</script>
<template>
    <scrollView v-model:scrollTopModel="scrollTop">
        <template #header>
            <scrollHeader :show="true" class="h-[45px]">
                <template #left>
                    <backword @click="router.back()"/>
                </template>
                <template #center>
                    <h1 class="text-dark-900 select-none text-xl font-bold">{{ title }}</h1>
                </template>
                <template #right v-if="layout.size != 'small' && showTab">
                    <div class="w-full h-full flex justify-end items-center pr-4">
                        <slot></slot>
                    </div>
                </template>
            </scrollHeader>
            <div class="pb-2 px-4 " v-if="layout.size == 'small' && showTab">
                <slot></slot>
            </div> 
            
            
        </template>
        <template #content>
            <div ref="scrollWrap">
                <div class="gridArea">
                    <videoCardBasic :toDetail="true" :media="media" v-for="media in list" :key="media.id"/>
                </div> 
            </div>
        </template>
    </scrollView>
</template>
<style scoped>

</style>