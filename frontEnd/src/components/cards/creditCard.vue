<script setup>
import { computed } from 'vue'
import loadImg from '@/components/common/loadImg.vue'
import { tmdbApi } from '@/apis/tmdbApi.js'
import personSvg from '@/assets/icons/person.svg'

const props = defineProps({
  "person": {
    Required: true
  },
})

const name = computed(() => props.person?.title || props.person?.name)
const character = computed(() => props.person?.character || props.person?.job)
const imageSrc = computed(() => props.person?.profile_path)

</script>
<template>
  <div class="creditCard pr-3 flex-shrink-0 cursor-pointer">
    <div class="cardImage defaultImage w-full overflow-hidden center">

      <loadImg :src="tmdbApi.tmdbImgPrefix + imageSrc" :defaultSrc="personSvg" />
    </div>
    <div class="info h-[5em] pt-2">
      <p class="filmTitle font-bold text-[0.8em] singleLine text-dark-900" v-if="name">
        {{ name }}
      </p>
      <p class="subFilmTitle text-[0.7em] h-[3em] maxLine txtDarkBasic" v-if="character">
        {{ character }}
      </p>
    </div>
  </div>
</template>
<style scoped lang="scss">
.creditCard {
  width: calc(100vw / var(--credit_card_num));

  .cardImage {
    aspect-ratio: 1;
  }

  @media (width < 500px) or (height < 500px) {
    font-size: 14px;
  }
}

.maxLine {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  /* 限制为3行 */
}
</style>