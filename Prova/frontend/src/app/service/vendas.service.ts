import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class VendasService {
    private HTTP = inject(HttpClient);

    constructor() {}
}
