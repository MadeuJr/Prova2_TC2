import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

const API_TOKEN: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NWYxZGUyNjA4ZmRmNmE2MDNlOGRjMGY3ZDZjZDU4ZSIsInN1YiI6IjY0Y2Q0YTI1ODI4OWEwMDEyNTBlNjMwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c0BGV6V0Kr7xoWUFeeDVohl-0x7hD-nME4V-AiI3Vqc';
const API_URL: string = 'https://api.themoviedb.org/3/movie';

const HEADERS = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + API_TOKEN,
});

@Injectable({
    providedIn: 'root',
})
export class FilmesService {
    private HTTP = inject(HttpClient);
    constructor() {}

    public getFilme() {
        return this.HTTP.get(`${API_URL}/3?language=pt-BR`, { headers: HEADERS });
    }
}
