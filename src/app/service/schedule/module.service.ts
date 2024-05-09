import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Departement} from "src/app/components/model/schedule/departement";
import {Modul} from "src/app/components/model/schedule/Modul";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private baseUrl = ' http://localhost:8089/api/Modules';
  Modules:Modul[]=[];
  constructor(private http: HttpClient) { }
  public getAllModules(): Observable<Modul[]> {
    console.log('Fetching Modules...',this.Modules);
    return this.http.get<Modul[]>(this.baseUrl);
  }
  public getModule(id: string): Observable<Modul> {
    return this.http.get<Modul>(`${this.baseUrl}/${id}`);
  }
  predictPopularity(programID:string): Observable<any> {
    return this.http.post(`http://localhost:8089/api/v1/program/predictPopularity?programID=${programID}`, {});
  }
}
