const tmdbApi = require('../../tmdbApi/index');
const { addToLibrary } = require('../../express/apis/medias/addToLibrary');
const fs = require('fs');

fs.readFile('films.txt', 'utf8', (err, data) => {
    const lines = data.split('\n').slice(1000, 1172)
    for (const line of lines) {
        const [title, year, link] = line.split(/\s+/);
        tmdbApi.searchMovie(title, year).then(res => { 
            if (res && res.results && res.results.length > 0) {
                const movie = res.results[0];
                addToLibrary(movie, 'movie', link).then(res => {
                    console.log(res);
                })
            }
        })

    }
})
