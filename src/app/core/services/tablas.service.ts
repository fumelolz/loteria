import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Tabla {
  id = 0;
  nombre = '';
  carta1 = new Carta();
  carta2 = new Carta();
  carta3 = new Carta();
  carta4 = new Carta();
  carta5 = new Carta();
  carta6 = new Carta();
  carta7 = new Carta();
  carta8 = new Carta();
  carta9 = new Carta();
  carta10 = new Carta();
  carta11 = new Carta();
  carta12 = new Carta();
  carta13 = new Carta();
  carta14 = new Carta();
  carta15 = new Carta();
  carta16 = new Carta();
}

class Carta {
  id = 1;
  nombre = '';
}

@Injectable({
  providedIn: 'root'
})
export class TablasService {

  constructor(private http: HttpClient) { }

  getTablas(): Observable<Tabla[]> {
    return this.http.get<Tabla[]>('http://localhost:3000/tablas');
  }

  getTableById(id: number): Observable<Tabla> {
    return this.http.get<Tabla>('http://localhost:3000/tablas/' + id);
  }

  saveTablas(body: any): Observable<Tabla> {
    return this.http.post<Tabla>('http://localhost:3000/tablas', body);
  }
}
