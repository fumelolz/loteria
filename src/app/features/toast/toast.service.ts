import {
  ApplicationRef,
  Injectable,
  Renderer2,
  RendererFactory2,
  createComponent,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ToastComponent } from './toast.component';
import { ToastModel } from './toast.model';

@Injectable()
export class ToastService {
  statusToast$: Subject<ToastModel> = new Subject();
  private renderer2: Renderer2;

  constructor(
    private readonly applicationRef: ApplicationRef,
    private readonly rendererFactory: RendererFactory2
  ) {
    this.renderer2 = this.rendererFactory.createRenderer(null, null);
    setTimeout(() => {
      this.createComponentToast();
    }, 1);
  }

  addToast(toast: ToastModel) {
    this.statusToast$.next(toast);
  }

  private createComponentToast(): void {
    let toastFixed = document.getElementById('toastFixed');
    if (!toastFixed) {
      toastFixed = this.renderer2.createElement('div');
      this.renderer2.setAttribute(toastFixed, 'id', 'toastFixed');
      this.renderer2.appendChild(document.body, toastFixed);
    }
    const environmentInjector = this.applicationRef.injector;
    const componentRef = createComponent(ToastComponent, {
      hostElement: toastFixed,
      environmentInjector,
    } as any);
    this.applicationRef.attachView(componentRef.hostView);
  }
}
