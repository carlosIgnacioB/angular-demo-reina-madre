
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { response, Irequest, Icita, IresponsePost } from '../model/Icita';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private CitaUrl = "http://localhost:9081/ClientApp/v1/cita";
  private CatalogosUrl = "http://localhost:9081/ClientApp/v1/catalogo";

  constructor(private http: HttpClient) {}

  public getCitas(): Observable<any> {
    return this.http.get<any>(`${this.CitaUrl}/obtenerCitas`);
  }

  public getCPasiente(): Observable<any> {
    return this.http.get<any>(`${this.CatalogosUrl}/pasientes`);
  }

  public getCMedico(): Observable<any> {
    return this.http.get<any>(`${this.CatalogosUrl}/medicos`);
  }

  public getCTipoCita(): Observable<any> {
    return this.http.get<any>(`${this.CatalogosUrl}/tipo/cita`);
  }

  public postNuevaCita(request: Irequest): Observable<any> {
    return this.http.post<any>(`${this.CitaUrl}/nuevaCita`,request);
  }

  public deleteCita(request: Irequest): Observable<any> {
    return this.http.delete<any>(`${this.CitaUrl}/eliminarCita/${request.citaId}`);
  }
}
