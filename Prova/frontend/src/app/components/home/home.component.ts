import {
    Component,
    inject,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { FilmesService } from '../../service/filmes.service';
import { SessoesService } from '../../service/sessoes.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy, OnChanges {
    private filmeService = inject(FilmesService);
    private sessaoService = inject(SessoesService);
    private router = inject(Router);
    sessoes: any = [];
    filme: any = [];
    loading: boolean = true;

    ngOnInit(): void {
        this.filme = [];
        this.sessoes = [];
        this.loadSessoes();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['sessoes']) {
            console.log('Sessoes changed:', changes['sessoes'].currentValue);
        }
    }

    ngOnDestroy(): void {}

    trackBySessaoId(index: number, sessao: any): number {
        return sessao.id;
    }

    private async loadSessoes() {
        await this.sessaoService.getSessoesAsc().subscribe((data) => {
            this.sessoes = data;
            this.sessoes.forEach((sessao: any) => {
                this.loadMovies(sessao.filmeId);
            });
        });
        this.loading = false;
    }
    private async loadMovies(id: number) {
        await this.filmeService.getFilme(id).subscribe((response) => {
            this.filme.push(response);
        });
    }

    sessionDetails(id: number) {
        this.router.navigate([`sessao/${id}`])
    }
}
