export const aiqiyiVideoListUrl = '/pcw/channel/tv?vip=0&device=10a627f2798124d2dab8bf896c90a8d0&v=9.9.165.6526&mode=page&page=2&isLowPerformPC=0&conduit_id=z43&ip=202.108.14.240&scale=150'


// export const aiqiyiUrlPrefix = 'https://mesh.if.iqiyi.com/portal/v5'
 
export const aiqiyiUrlPrefix = 'aiqyiyi'

export const aiqiyiMapMedia = (list, type) => {
    return list.map(item => {
        const {
            image_url_normal,
            album_image_url_hover,
            date,
            display_name
        } = item
        const { year, month, day } = date
        return {
            poster_path: type ? image_url_normal : album_image_url_hover,
            title: display_name,
            release_date: year + '-' + month + '-' + day
        }
    }) 
}