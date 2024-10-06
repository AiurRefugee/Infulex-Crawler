<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router"; 
const router = useRouter();
import { get, post } from "@/APIS/axiosWrapper.js"
import { useFilmStore } from "@/stores/films.ts"
import { layoutStore } from '@/stores/layout'

// 测试前端SSE调用
import { fetchEventSource } from '@microsoft/fetch-event-source'
const testSSE = () => {
    const OPENAI_API_KEY = 'app-2GQugsgK0DwVvcwcvEjAfFs3'
    const OPENAI_COMPLETION_ENDPOINT = 'http://iflight.eatuo.com:32241/v1/chat-messages'
    const requestData = {
        query: '你是谁',
        inputs: {},
        response_mode: 'streaming',
        user: 'iflight'
    }
    let respString = ''
    fetchEventSource(OPENAI_COMPLETION_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify(requestData),
        async onopen(response) {
            // const message = JSON.parse(response)
            console.log('打开成功')
        },
        async onmessage(event) { 
            const jsonData = JSON.parse(event.data)
            // 如果等于stop表示结束
             console.log(jsonData.answer)
        },
        async onerror(error) {
            console.error('Error:', error)
        },
        async onclose() {
            // if the server closes the connection unexpectedly, retry:
            console.log('关闭连接')
        }
    })
    console.log('测试SSE')
}

testSSE()

const layout = layoutStore();
const filmStore = useFilmStore()

const breakPointSmall = 628;
const breakPointNormal = 1375;

function calWindowSize() {
  var newSize = "normal";
  console.log("resize");
  const windowSize = window.innerWidth;
  if (windowSize <= breakPointSmall) {
    newSize = "small"; 
  } else if (windowSize > breakPointSmall && windowSize <= breakPointNormal) {
    newSize = "normal"; 
  }
  if (windowSize > breakPointNormal) {
    newSize = "large"; 
  }  
  layout.setSize(newSize)
  return newSize;
}


onMounted(() => { 
  calWindowSize();
  window.addEventListener("resize", calWindowSize);
  // router.push({
  //   name: 'search',
  //   replace: true,
  // })
})

// onMounted(async () => {

//   post('/findFilms').then((res) => filmStore.films = res.data)
  
//   get('/getClasses').then((res) => {
//     const tags = {}
//     const films = res.data 
//     for (const film of films) { 
//       if (film && film.imageUrls) {
//         tags[film.genreId] = {
//           backgroundUrl: film.imageUrls[0],
//           backgroundColor: film.background,
//           name: film.genreName
//         }
//       }
      
//     }
//     filmStore.tags = tags
//     console.log(tags)
//   })
 
//   get('/getTopTwenty').then((res) => filmStore.topTwenty = res.data)


//   document.addEventListener("resize", () => {
//     const listDom = document.getElementsByClassName("list");
//     Array.from(listDom).forEach((item) => {
//       item.style.overflow = "hidden";
//     });
//   });
// });

</script>
<template> 
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition">
        <component :is="Component" />
      </transition>
    </router-view> 
</template>