import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';

const COMPONENTS = [ToastComponent];
const SERVICES = [ToastService];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule],
  providers: [SERVICES],
})
export class ToastModule {}
