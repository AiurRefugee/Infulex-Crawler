const movieGenres = [
    {
        id: 28,
        name: "动作",
    },
    {
        id: 12,
        name: "冒险",
    },
    {
        id: 16,
        name: "动画",
    },
    {
        id: 35,
        name: "喜剧",
    },
    {
        id: 80,
        name: "犯罪",
    },
    {
        id: 99,
        name: "纪录",
    },
    {
        id: 18,
        name: "剧情",
    },
    {
        id: 10751,
        name: "家庭",
    },
    {
        id: 14,
        name: "奇幻",
    },
    {
        id: 36,
        name: "历史",
    },
    {
        id: 27,
        name: "恐怖",
    },
    {
        id: 9648,
        name: "悬疑",
    },
    {
        id: 10749,
        name: "爱情",
    },
    {
        id: 878,
        name: "科幻",
    },
    {
        id: 10752,
        name: "战争",
    },
    {
        id: 37,
        name: "西部",
    },
]

const idMap = {}
movieGenres.forEach(item => {
    idMap[item.id] = item
})

module.exports = {
    idMap
}