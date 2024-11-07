import { useRouter } from "vue-router";


export const toDetail = (router, media, mediaType) => { 
    const title = media.title || media.name
    const time = media.release_date || media.first_air_date
    router.push({
      path: '/mediaDetail/' + title,
      query: {
        id: media?.id,
        media_type: media?.media_type || mediaType,
        year: time.split('-')[0]
      },
    })
  }