const fs = require('fs')

const resources = fs.readFileSync('filmRecource.txt', 'utf8')

const list = resources.split('\n')

list.forEach((item) => { 
    const regex = /https?:\/\/[^\s<>]+[^\s<>.,]/gi;

    const links = item.match(regex);
    // console.log(links?.[0]);

    const yearRegex = /\b(19|20)\d{2}\b/g;

    const years = item.match(yearRegex);
    // console.log(years?.[0]);

    const name = item.split(' ').slice(0, 2)
    console.log(name)

})


const res = []
list.forEach((item, index) => {
    
    const yearRegex = /\b(19|20)\d{2}\b/g;

    const years = item.match(yearRegex);
    const save = Math.random() < 0.15
    if (years > 2008 && save) {
        res.push(item)
    } 
    
})
fs.writeFileSync('filteredFilms.txt', res.join('\n'))

console.log(res)