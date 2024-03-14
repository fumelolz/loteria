import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tabla, TablasService } from 'src/app/core/services/tablas.service';

@Component({
  selector: 'app-detail-tabla',
  templateUrl: './detail-tabla.component.html',
  styleUrls: ['./detail-tabla.component.scss'],
})
export class DetailTablaComponent implements OnInit {
  tabla: Tabla = new Tabla();
  constructor(private readonly tablasService: TablasService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.tablasService.getTableById(params['id']).subscribe({next: data => {
        this.tabla = data;
      }})
     })
  }
}
