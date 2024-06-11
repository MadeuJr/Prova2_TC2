import { Component, inject, OnInit } from '@angular/core';
import { FilmesService } from '../../service/filmes.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
    private filmeService = inject(FilmesService);
    private filme: any ;

    ngOnInit(): void {
        this.loadMovies();
    }

    private loadMovies() {
        this.filmeService.getFilme().subscribe(response => {
          this.filme = response;
          console.log(this.filme);
        })
    }
}
