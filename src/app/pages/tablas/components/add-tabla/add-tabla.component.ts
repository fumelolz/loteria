import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Carta, CartasService } from 'src/app/core/services/cartas.service';
import { TablasService } from 'src/app/core/services/tablas.service';
import { ToastService } from 'src/app/features/toast/toast.service';

@Component({
  selector: 'app-add-tabla',
  templateUrl: './add-tabla.component.html',
  styleUrls: ['./add-tabla.component.scss'],
})
export class AddTablaComponent implements OnInit {
  cars = [
    {
      id: '1',
      name: 'Mazda MX-5 Miata',
      img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-mazda-mx-5-miata-mmp-1-1593459650.jpg?crop=0.781xw:0.739xh;0.109xw,0.0968xh&resize=480:*',
    },
    {
      id: '2',
      name: 'Toyota Supra',
      img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2020-chevrolet-corvette-c8-102-1571146873.jpg?crop=0.548xw:0.411xh;0.255xw,0.321xh&resize=980:*',
    },
    {
      id: '3',
      name: 'Chevy Corvette',
      img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-porsche-cayman-mmp-1-1593003674.jpg?crop=0.648xw:0.485xh;0.129xw,0.263xh&resize=980:*',
    },
    {
      id: '4',
      name: 'Porsche 718 Cayman',
      img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-porsche-718-cayman-mmp-1-1593003156.jpg?crop=0.735xw:0.551xh;0.138xw,0.240xh&resize=980:*',
    },
    {
      id: '5',
      name: 'Porsche 718 Boxster',
      img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-bmw-m2-mmp-1-1599687968.jpg?crop=0.706xw:0.528xh;0.102xw,0.268xh&resize=980:*',
    },
    {
      id: '6',
      name: 'BMW M2',
      img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-bmw-z4-mmp-1-1599583762.jpg?crop=0.779xw:0.584xh;0.0782xw,0.196xh&resize=980:*',
    },
    {
      id: '7',
      name: 'BMW Z4',
      img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-chevrolet-camaro-mmp-1-1585333717.jpg?crop=0.344xw:0.331xh;0.241xw,0.328xh&resize=980:*',
    },
    {
      id: '8',
      name: 'Chevy Camaro',
      img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-chevrolet-camaro-zl1-mmp-1-1604071262.jpg?crop=0.818xw:0.663xh;0.0799xw,0.163xh&resize=980:*',
    },
    {
      id: '9',
      name: 'Chevy Camaro ZL1',
      img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-chevrolet-camaro-zl1-mmp-1-1604071262.jpg?crop=0.818xw:0.663xh;0.0799xw,0.163xh&resize=768:*',
    },
  ];
  cartas: any[] = [];
  completed: boolean = false;
  error = false;
  errorMessage: string = '';
  nombre = new FormControl('');

  constructor(
    private readonly cartasService: CartasService,
    private readonly tablasServices: TablasService,
    private readonly toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.cartasService.getTablas().subscribe({
      next: (data) => {
        this.cartas = data.map((carta) => {
          return {
            id: carta.id,
            nombre: carta.nombre,
            completed: false,
          };
        });
      },
    });
  }

  cambio(event: any, id: number) {
    const carta = this.cartas.findIndex((c) => c.id === id);
    this.cartas[carta].completed = event.target.checked;
  }

  crear() {
    const cartas = this.cartas.filter((carta) => carta.completed);

    if(this.nombre.value === '') {
      this.toastService.addToast({
        title: 'Advertencia',
        description: 'El campo nombre no puede ir vacio',
        type: 'warning',
        selfClosing: false,
        errorList: [],
      });
      return;
    }

    if (cartas.length < 12) {
      this.toastService.addToast({
        title: 'Advertencia',
        description: 'Tienes que escoger más cartas',
        type: 'warning',
        selfClosing: false,
        errorList: [],
      });
      return;
    }

    if (cartas.length > 12) {
      this.toastService.addToast({
        title: 'Advertencia',
        description: 'Tienes que escoger menos cartas',
        type: 'warning',
        selfClosing: false,
        errorList: [],
      });
      return;
    }
    const body = {
      nombre: this.nombre.value,

      carta1: cartas[0].id,

      carta2: cartas[1].id,

      carta3: cartas[2].id,

      carta4: cartas[3].id,

      carta5: cartas[4].id,

      carta6: cartas[5].id,

      carta7: cartas[6].id,

      carta8: cartas[7].id,

      carta9: cartas[8].id,

      carta10: cartas[9].id,

      carta11: cartas[10].id,

      carta12: cartas[11].id,
    };
    this.tablasServices.saveTablas(body).subscribe({
      next: (response) => {
        this.toastService.addToast({
          title: 'Success',
          description: 'La tabla se creo correctamente',
          type: 'success',
          selfClosing: true,
          errorList: [],
        });
      },
      error: (error) => {
        this.toastService.addToast({
          title: 'Error',
          description: error.error.error,
          type: 'error',
          selfClosing: false,
          errorList: [],
        });
      },
    });
  }

  get cartasLength(): number {
    return this.cartas.filter((carta) => carta.completed).length;
  }
}
