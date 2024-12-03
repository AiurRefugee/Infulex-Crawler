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
import TypeTab from './typeTab.vue'; 
const route = useRoute() 
const router = useRouter()
const { mediaType, genreId, genreName } = route.params
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
const today = new Date().toLocaleString().split(' ')[0]
const queryParam = {
    page: 0,
    language: 'zh-CN',
    // sort_by: 'primary_release_date.desc',
    // 'release_date.lte': today
}
const windowHeight = window.innerHeight
let maxHeight = 0, calHeightTimeout = null, canSearch = true
let totalPage = 10

const calHeight = () => {
    maxHeight = document.getElementsByClassName('gridArea')[0].scrollHeight
    canSearch = true 
}

const search = () => {
    if (!canSearch) return
    canSearch = false 
    const genreId = type.value == 'movie' ? movieTag.value.id : tvTag.value.id
    if (queryParam.page == totalPage) return false
    queryParam.page += 1
    const params = {
        ...queryParam,
        with_genres: genreId
    }
    tmdbApi.discover(type.value, params).then( res => {
        totalPage = res.total_pages
        const listPointer = type.value == 'movie' ? list : tvList
        listPointer.value = listPointer.value.concat(res.results)
        setTimeout( calHeight, 100)
    }).catch( err => {
        canSearch = true
        console.log('discover err', err)
    })
}


watch(scrollTop, (newVal) => { 
    if (newVal + windowHeight > maxHeight - maxHeight / 5) {
        search()
    }
})

watch(type, async (newVal) => {
    canSearch = true
    queryParam.page = 1
    console.log('mediaType', newVal)
    search()
})

const toDetail = (media) => {
  console.log("toDetail");  
  const title = media.title || media.name 
  router.push({
    path: '/mediaDetail/' + title,
    query: {
      id: media?.id,
      media_type: type.value
    },
  })
}

onMounted( () => {
    if (layout.size == 'small') {
        layout.setTabIconVisible(false)
    }
    search()
    if (layout.size != 'small') { 
        canSearch = true
        search()
    }
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
            <div class="gridArea" v-if="type == 'movie'">
                <videoCardBasic :media="media" v-for="media in list" :key="media.id" @click="toDetail(media)"/>
            </div>
            <div class="gridArea" v-if="type == 'tv'">
                <videoCardBasic :media="media" v-for="media in tvList" :key="media.id" @click="toDetail(media)"/>
            </div>
        </template>
    </scrollView>
</template>
<style scoped>

</style>