import { get, post } from './axiosWrapper.js'

export function getAllFilms() {
    return get('/api/films');
}