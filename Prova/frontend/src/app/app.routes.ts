import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'

export const routes: Routes = [
    {path:'', component: HomeComponent, pathMatch:'full'},
    // {path: 'comp2', component: Rota2Component, pathMatch: 'full'}
];
