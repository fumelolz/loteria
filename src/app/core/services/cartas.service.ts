import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Carta {
  id:     number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  constructor(private http: HttpClient) { }

  getTablas(): Observable<Carta[]> {
    return this.http.get<Carta[]>('http://localhost:3000/cartas');
  }
}
