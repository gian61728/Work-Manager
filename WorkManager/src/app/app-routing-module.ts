import { Routes, RouterModule } from '@angular/router';
import { List } from './clientes/list/list';
import { ListPrestador } from './prestadores/list/list';
import { ListServico } from './servicos/list/list';

export const routes: Routes = [
  { path: '', component: List },
  { path: 'prestadores', component: ListPrestador  },
  { path: 'servicos', component: ListServico  },
];



