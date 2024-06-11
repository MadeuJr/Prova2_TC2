import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { AtualizaSalaComponent } from './components/sala/atualiza-sala/atualiza-sala.component';
import { AtualizaSessaoComponent } from './components/sessao/atualiza-sessao/atualiza-sessao.component';
import { CadastraSessaoComponent } from './components/sessao/cadastra-sessao/cadastra-sessao.component';
import { CadastroSalaComponent } from './components/sala/cadastro-sala/cadastro-sala.component';
import { CadastraVendaComponent } from './components/venda/cadastra-venda/cadastra-venda.component';
import { DeletaSalaComponent } from './components/sala/deleta-sala/deleta-sala.component';
import { DeletaSessaoComponent } from './components/sessao/deleta-sessao/deleta-sessao.component';
import { VendaAllComponent } from './components/venda/venda-all/venda-all.component';
import { VendaInfoComponent } from './components/venda/venda-info/venda-info.component';
import { SalaInfoComponent } from './components/sala/sala-info/sala-info.component';
import { SalasAllComponent } from './components/sala/salas-all/salas-all.component';
import { SessaoAllComponent } from './components/sessao/sessao-all/sessao-all.component';
import { SessaoInfoComponent } from './components/sessao/sessao-info/sessao-info.component';

CadastraSessaoComponent
CadastroSalaComponent
CadastraVendaComponent
DeletaSalaComponent
DeletaSessaoComponent
VendaAllComponent
VendaInfoComponent
SalaInfoComponent
SalasAllComponent
SessaoAllComponent
SessaoInfoComponent
AtualizaSalaComponent
AtualizaSessaoComponent

export const routes: Routes = [
    {path:'', component: HomeComponent, pathMatch:'full'},
    
    //Salas
    
    {path:'sala/:id', component: SalaInfoComponent, pathMatch:'full'},
    {path:'sala', component: SalasAllComponent, pathMatch:'full'},
    {path:'sala/cadastrar', component: CadastroSalaComponent, pathMatch:'full'},
    {path:'sala/atualizar/:id', component: AtualizaSalaComponent, pathMatch:'full'},
    {path:'sala/deletar/:id', component: DeletaSalaComponent, pathMatch:'full'},

    //Sessões

    {path:'sessao/:id', component: SessaoInfoComponent, pathMatch:'full'},
    {path:'sessao', component: SessaoAllComponent, pathMatch:'full'},
    {path:'sessao/cadastrar', component: CadastraSessaoComponent, pathMatch:'full'},
    {path:'sessao/atualizar/:id', component: AtualizaSessaoComponent, pathMatch:'full'},
    {path:'sessao/deletar/:id', component: DeletaSessaoComponent, pathMatch:'full'},

    //Venda 

    {path:'venda/:id', component: VendaInfoComponent, pathMatch:'full'},
    {path:'venda/', component: VendaAllComponent, pathMatch:'full'},
    {path:'venda/cadastrar', component: CadastraVendaComponent, pathMatch:'full'},

    // {path: 'comp2', component: Rota2Component, pathMatch: 'full'}
];
