<script setup>
import { computed, inject } from 'vue' 
import { tmdbApi } from '@/APIs/tmdbApi.js'

const props = defineProps({ 
  "person": {
    Required: true
  }, 
})

const name = computed( () => props.person?.title || props.person?.name )
const character = computed( () => props.person?.character || props.person?.job)
const imageSrc = computed( () => tmdbApi.tmdbImgPrefix + props.person?.profile_path )

</script>
<template>
  <div class="creditCard pr-3 flex-shrink-0 cursor-pointer">
    <div class="cardImage w-full rounded-xl overflow-hidden">
      <img class="w-full h-full object-cover" :src="imageSrc" />
    </div>
    <div class="info h-[5em] pt-2">
      <p 
        class="filmTitle font-bold singleLine txtDarkPrimary"
        v-if="name"
      >
        {{ name }}
      </p>
      <p 
        class="subFilmTitle text-[0.8em] h-[3em] maxLine txtDarkBasic"
        v-if="character"
      >
        {{ character }}
      </p>
    </div>
  </div>
</template>
<style scoped lang="scss"> 
.creditCard {
  width: calc(100vw / var(--credit_card_num)); 
  
  .cardImage {
    border: 2px solid rgba(138, 138, 138, 0.32);
    aspect-ratio: 1;
  } 
  @media (width < 500px) or (height < 500px) {
    font-size: 12px;
  }
}  
.maxLine {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3; /* 限制为3行 */
}
.info:has(.subFilmTitle) {
  // height: 4em;
}
</style>