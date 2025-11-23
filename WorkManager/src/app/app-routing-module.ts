import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { List } from './clientes/list/list';

export const routes: Routes = [
  {
    path:"",component:List
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
