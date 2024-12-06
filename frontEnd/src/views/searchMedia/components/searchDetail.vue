<script setup> 
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, watch, nextTick, computed } from 'vue' 
import videoCardBasic from '@/components/cards/videoCardBasic.vue';
import scrollView from '@/viewComponents/scrollView.vue';
import scrollHeader from '@/components/common/scrollHeader.vue';
import backword from '@/components/common/backword.vue';
import { tmdbApi } from '@/apis/tmdbApi.js' 
import { layoutStore } from "@/stores/layout";
import { useMediaStore } from "@/stores/media";
import TypeTab from '../../../components/common/typeTab.vue'; 
const route = useRoute() 
const router = useRouter()
const { genreName } = route.params
const layout = layoutStore();
const mediaStore = useMediaStore();
const genres = computed(() => mediaStore.genres)
const tvGenre = computed(() => mediaStore.tvGenre)
const movieTag = computed( () => genres.value.find( item => item.name == genreName))
const tvTag = computed( () => tvGenre.value.find( item => item.name == genreName))
const showTab = computed( () => movieTag.value && tvTag.value)
const title = ref(genreName)
const list = ref([]) 
const tvList = ref([])
const type = ref('movie')
const scrollTop = ref(0)
const scrollWrap = ref(null)
const queryParam = {
    page: 0,
    language: 'zh-CN', 
    'vote_average.gte': 7.0,
    'vote_count.gte': 500
}
const tvQueryParam = {
    page: 0,
    language: 'zh-CN',
}
const windowHeight = window.innerHeight
let maxHeight = windowHeight, calHeightTimeout = null, canSearch = true
let totalPage = 10, tvTotalPage = 10

const calHeight = () => {
    maxHeight = scrollWrap.value.scrollHeight
    console.log(maxHeight)
    
}

const search = async () => {
    if (!canSearch) return
    canSearch = false 
    const genreId = type.value == 'movie' ? movieTag.value.id : tvTag.value.id
    let params
    if (type.value == 'movie') {
        if (queryParam.page >= totalPage) return
        queryParam.page += 1
        params = {
            ...queryParam,
            with_genres: genreId
        }
    }
    if (type.value == 'tv') {
        if (tvQueryParam.page >= tvTotalPage) return
        tvQueryParam.page += 1
        params = {
            ...tvQueryParam,
            with_genres: genreId
        }
    }
    
    tmdbApi.discover(type.value, params).then(async res => {
        if (type.value == 'movie') {
            totalPage = res.total_pages
        }
        if (type.value == 'tv') {
            tvTotalPage = res.total_pages
        }

        const listPointer = type.value == 'movie' ? list : tvList
        listPointer.value = listPointer.value.concat(res.results)
        await nextTick()
        canSearch = true 
        if (lastCardCanBeSeen()) {
            search()
        }
    }).catch( err => {
        canSearch = true
        console.log('discover err', err)
    })
}


watch(scrollTop, async (newVal) => { 
    await nextTick()
    calHeight()
    if (newVal + windowHeight > maxHeight - windowHeight / 3) {
        search()
    }
})

watch(type, async (newVal) => {
    init(newVal)
})

const lastCardCanBeSeen = () => {
    const lastCard = document.querySelector('.basicCard:last-child')
    console.log(lastCard)
    if (lastCard) {
        const lastCardRect = lastCard.getBoundingClientRect()
        return lastCardRect.top < windowHeight
    }
    return false
}

const init = async (type) => {
    const param = type == 'movie' ? queryParam : tvQueryParam
    if (param.page == 0) {
        search()
    }
}

onMounted( () => {
    if (layout.size == 'small') {
        layout.setTabIconVisible(false)
    }
    init(type.value)
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
                        <TypeTab class="h-[30px]" v-model:mediaType="type"/>
                    </div>
                </template>
            </scrollHeader>
            <div class="pb-2 px-4 " v-if="layout.size == 'small' && showTab">
                <TypeTab class="h-[30px]"  v-model:mediaType="type"/>
            </div> 
            
            
        </template>
        <template #content>
            <div ref="scrollWrap">
                <div class="gridArea" v-if="type == 'movie'">
                <videoCardBasic :toDetail="true" :media="media" v-for="media in list" :key="media.id"/>
                </div>
                <div class="gridArea" v-if="type == 'tv'">
                    <videoCardBasic :toDetail="true" :media="media" :mediaType="'tv'" v-for="media in tvList" :key="media.id"/>
                </div>
            </div>
        </template>
    </scrollView>
</template>
<style scoped>

</style>