import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

const HEADERS = new HttpHeaders({
    'Content-Type': 'application/json'
});

@Injectable({
    providedIn: 'root',
})
export class SessoesService {
    private HTTP = inject(HttpClient);

    constructor() {}

    public getSessoesAsc(){
        return this.HTTP.get('http://localhost:2981/sessao/asc', {headers: HEADERS});
    }
     
}
