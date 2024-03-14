import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablasComponent } from './tablas.component';
import { TablasRoutingModule } from './tablas-routing.module';
import { ListTablasComponent } from './components/list-tablas/list-tablas.component';
import { AddTablaComponent } from './components/add-tabla/add-tabla.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailTablaComponent } from './components/detail-tabla/detail-tabla.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TablasComponent,
    ListTablasComponent,
    AddTablaComponent,
    DetailTablaComponent
  ],
  imports: [
    CommonModule,
    TablasRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class TablasModule { }
