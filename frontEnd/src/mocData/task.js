const files = []
for (let i = 1; i <= 10; i++) {
    files.push(`复仇者联盟${i}`)
}

const msgs = [
    {
        type: 'getLink',
        data: 'www.aliyundrive.com/s/UZjojouQJNr',
        time: '01-01 12:00'
    },
    {
        type: 'getFile',
        name: '复仇者联盟',
        data: [...files, ...files],
        time: '01-01 12:00'
    },
    {
        type: 'getVideo',
        data: '复仇者联盟复仇者联盟复仇者联盟 4 4k.mkv',
        time: '01-01 12:00'
    }
]


export const task = [
    {
        title: '复仇者联盟 4',
        status: '进行中',
        poster_path: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
        msgs
    },
    {
        title: '复仇者联盟 2',
        status: '已取消',
        poster_path: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
        msgs
    },
    {
        title: '复仇者联盟 3',
        status: '错误',
        poster_path: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
        msgs
    }
]