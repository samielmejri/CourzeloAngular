import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ressource } from 'src/app/components/model/Ressource';
import { Observable } from 'rxjs';
import { HttpEvent, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RessourceService {

  private apiUrl = 'http://localhost:8089/cours';

  constructor(private http: HttpClient) { }

  deleteRessource(id: string) {
    return this.http.delete(`${this.apiUrl}/supprimerRessource/${id}`, { withCredentials: true });
  }

  modifierRessource(id: string, ressource: Ressource) {
    return this.http.put(`${this.apiUrl}/modifierRessource/${id}`, ressource, { withCredentials: true });
  }


    // define function to upload files
    upload(formData: FormData, idRessource: string): Observable<HttpEvent<any>> {
      const uploadUrl = `${this.apiUrl}/uploadVideo/${idRessource}`; // ajuster l'URL pour inclure l'ID de la ressource
      return this.http.post(uploadUrl, formData, {
          reportProgress: true,
          observe: 'events',
      });
  }
  



  download(filename: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.apiUrl}/downloadVideo/${filename}`, {

      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }
  

}
