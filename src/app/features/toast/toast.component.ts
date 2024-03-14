import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from './toast.service';

@Component({
  selector: 'rs-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit, OnDestroy {
  @ViewChild('toastContainer', { static: false })
  toastContainer!: ElementRef<HTMLElement>;
  listenerClickFn!: () => void;
  listenerAnimationEndFn!: () => void;
  toastSubcription$!: Subscription;

  constructor(
    private renderer2: Renderer2,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.toastSubcription$ = this.toastService.statusToast$.subscribe(
      (data) => {
        const toastContainer = this.toastContainer.nativeElement;

        //Create toast
        const toast = this.renderer2.createElement('div');
        this.renderer2.addClass(toast, 'toast');
        let typeToast = '';
        if (data.type === 'success') typeToast = 'toast--sucess';
        if (data.type === 'error') typeToast = 'toast--error';
        if (data.type === 'info') typeToast = 'toast--info';
        if (data.type === 'warning') typeToast = 'toast--warning';
        this.renderer2.addClass(toast, typeToast);

        //Create toast__body
        const toast_body = this.renderer2.createElement('div');
        this.renderer2.addClass(toast_body, 'toast__body');

        //Create toast__icon
        const toast__icon = this.renderer2.createElement('i');
        let typeIcon = '';
        if (data.type === 'success') typeIcon = 'bxs-check-square';
        if (data.type === 'error') typeIcon = 'bxs-x-square';
        if (data.type === 'info') typeIcon = 'bxs-info-square';
        if (data.type === 'warning') typeIcon = 'bxs-hot';
        this.renderer2.addClass(toast__icon, 'bx');
        this.renderer2.addClass(toast__icon, typeIcon);
        this.renderer2.addClass(toast__icon, 'toast__icon');

        //Create toast__text
        const toast_text = this.renderer2.createElement('div');
        this.renderer2.addClass(toast_text, 'toast__text');

        //Create toast__title
        const toast_title = this.renderer2.createElement('p');
        this.renderer2.addClass(toast_title, 'toast__title');
        const toast_titleTexto = this.renderer2.createText(data.title!);
        this.renderer2.appendChild(toast_title, toast_titleTexto);

        //Create toast__description
        const toast_description = this.renderer2.createElement('p');
        this.renderer2.addClass(toast_description, 'toast__description');
        const toast_descriptionTexto = this.renderer2.createText(
          data.description || ''
        );
        this.renderer2.appendChild(toast_description, toast_descriptionTexto);

        //Create toast__close
        const toast_close = this.renderer2.createElement('button');
        this.renderer2.addClass(toast_close, 'toast__close');

        //Create toast__icon-close
        const toast__iconClose = this.renderer2.createElement('i');
        this.renderer2.addClass(toast__iconClose, 'toast__icon-close');
        this.renderer2.addClass(toast__iconClose, 'bx');
        this.renderer2.addClass(toast__iconClose, 'bx-x');

        //Add SelfClosing
        if (data.selfClosing) {
          this.renderer2.addClass(toast, 'toast--self-closing');
        }

        //Anidando los elementos
        this.renderer2.appendChild(toast_text, toast_title);
        this.renderer2.appendChild(toast_text, toast_description);

        if (data.errorList && data.errorList.length) {
          //Create toast__errors
          const toast__errors = this.renderer2.createElement('footer');
          this.renderer2.addClass(toast__errors, 'toast__errors');

          data.errorList.map((error) => {
            // Create toast__errors_item
            const toast__errors_item = this.renderer2.createElement('div');
            this.renderer2.addClass(toast__errors_item, 'toast__errors-item');

            //Create toast__errors__title
            const toast__errors__title = this.renderer2.createElement('p');
            this.renderer2.addClass(
              toast__errors__title,
              'toast__errors__title'
            );
            const toast__errors__titleText = this.renderer2.createText(
              error.name
            );
            this.renderer2.appendChild(
              toast__errors__title,
              toast__errors__titleText
            );
            this.renderer2.appendChild(
              toast__errors_item,
              toast__errors__title
            );

            //Create toast__errors__list
            const toast__errors__list = this.renderer2.createElement('ul');
            this.renderer2.addClass(toast__errors__list, 'toast__errors__list');
            this.renderer2.appendChild(toast__errors_item, toast__errors__list);

            //Create toast__errors__error
            error.descriptionList.map((element: any) => {
              const toast__errors__error = this.renderer2.createElement('li');
              this.renderer2.addClass(
                toast__errors__error,
                'toast__errors__error'
              );
              const toast__errors__errorText =
                this.renderer2.createText(element);
              this.renderer2.appendChild(
                toast__errors__error,
                toast__errors__errorText
              );
              this.renderer2.appendChild(
                toast__errors__list,
                toast__errors__error
              );
            });

            this.renderer2.appendChild(toast__errors, toast__errors_item);
          });

          this.renderer2.appendChild(toast_text, toast__errors);
        }

        this.renderer2.appendChild(toast_body, toast__icon);
        this.renderer2.appendChild(toast_body, toast_text);

        this.renderer2.appendChild(toast_close, toast__iconClose);

        this.renderer2.appendChild(toast, toast_body);
        this.renderer2.appendChild(toast, toast_close);

        this.renderer2.appendChild(toastContainer, toast);

        this.listenerClickFn = this.renderer2.listen(
          toast_close,
          'click',
          () => {
            this.renderer2.addClass(toast, 'toast--closing');
          }
        );

        this.listenerAnimationEndFn = this.renderer2.listen(
          toast,
          'animationend',
          (event) => {
            if (event.animationName.includes('toast_output')) {
              this.renderer2.removeChild(toastContainer, toast);
            }
            if (event.animationName.includes('toast_self-closing')) {
              this.renderer2.addClass(toast, 'toast--closing');
            }
          }
        );
      }
    );
  }

  ngOnDestroy() {
    if (this.listenerClickFn) {
      this.listenerClickFn();
    }
    if (this.listenerAnimationEndFn) {
      this.listenerAnimationEndFn();
    }
    this.toastSubcription$.unsubscribe();
  }
}
