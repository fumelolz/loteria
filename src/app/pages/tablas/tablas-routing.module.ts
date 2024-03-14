import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablasComponent } from './tablas.component';
import { AddTablaComponent } from './components/add-tabla/add-tabla.component';
import { ListTablasComponent } from './components/list-tablas/list-tablas.component';
import { DetailTablaComponent } from './components/detail-tabla/detail-tabla.component';


const routes: Routes = [
  {
    path: '',
    component: TablasComponent,
    children: [
      {
        path: '',
        component: ListTablasComponent
      },
      {
        path: 'new',
        component: AddTablaComponent
      },
      {
        path: 'detail/:id',
        component: DetailTablaComponent
      },
      // {
      //   path: 'update/:id',
      //   loadChildren: () =>
      //     import('./pages/add-product/add-product.module').then(
      //       (m) => m.AddProductModule
      //     ),
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablasRoutingModule {}
