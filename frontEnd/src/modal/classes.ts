class Person {
    name: string;
    profession: string;
    gender: string;
    age: number;
    films: string[];
    dramas: Drama[];
    award: string[];
    imageUrl: string;
}

class Media {
    name: string;
    year: number; 
    tags: string[];  
    coverImageUrl: string;
    productCompanies: string;
    // ...
}

class Film extends Media{
    direcors: Person[];
    writers: Person[];
    actors: Person[];
    duration: number; 
    rating: string;
}

class Music extends Media{
    singer: Person[];
    composer: Person[];
    lyricist: Person[];
    duration: number; 
    // ...
}

class Album{ 
    awards: string[];
    publisher: string;
    musics: Music[];
    // ...
}

class Drama extends Meida {
    num: number;
}