<script setup>
import { computed, inject } from 'vue' 
import { tmdbImgPrefix } from '@/config/tmdbConfig' 

const props = defineProps({ 
  "person": {
    Required: true
  },
  "imageSrcPrefix": {
    Required: false,
    default: tmdbImgPrefix
  }
})

const name = computed( () => props.person?.title || props.person?.name )
const character = computed( () => props.person?.character )

</script>
<template>
  <div class="creditCard pr-5 flex-shrink-0 cursor-pointer">
    <div class="cardImage w-full rounded-xl overflow-hidden">
      <img class="w-full h-full object-cover" :src="imageSrcPrefix + person?.profile_path" />
    </div>
    <div class="info pt-2">
      <p 
        class="filmTitle text-[1.1em] font-bold singleLine txtDarkPrimary"
        v-if="name"
      >
        {{ name }}
      </p>
      <p 
        class="subFilmTitle text-[0.8em] max-h-[3em] maxLine txtDarkSecondary"
        v-if="character"
      >
        {{ character }}
      </p>
    </div>
  </div>
</template>
<style scoped lang="scss"> 
.creditCard {
  width: calc(100vw / var(--creditCardNum)); 
  .cardImage {
    aspect-ratio: 1;
  } 
  @media (width < 500px) or (height < 500px) {
    font-size: 12px;
  }
}  
.maxLine {
  -webkit-line-clamp: 3; /* 限制为3行 */
}
</style>