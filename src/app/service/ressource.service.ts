import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ressource } from '../model/Ressource';
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

 /* uploadRessource(id: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    // Créer une nouvelle instance HttpHeaders et définir le type de contenu
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');

    return this.http.post(`${this.apiUrl}/uploadRessource/${id}`, formData, { headers, withCredentials: true, reportProgress: true, observe: 'events' });
  }*/

    // define function to upload files
    upload(formData: FormData): Observable<HttpEvent<string[]>> {
      return this.http.post<string[]>(`${this.apiUrl}/upload`, formData, {
        reportProgress: true,
        observe: 'events'
      });
    }
  
    // define function to download files
   /* download(filename: string): Observable<HttpEvent<Blob>> {
      return this.http.get(`${this.apiUrl}/download/${filename}/`, {
        reportProgress: true,
        observe: 'events',
        responseType: 'blob'
      });
    }*/

    associateVideoToRessource(idRessource: string, videoId: string): Observable<any> {
      const url = `${this.apiUrl}/associateVideoToRessource/${idRessource}`;
      return this.http.put(url, { videoId }, { withCredentials: true });
    }

    download(filename: string): Observable<HttpEvent<Blob>> {
      const url = `${this.apiUrl}/download/${filename}`;
      return this.http.get(url, {
          responseType: 'blob',
          reportProgress: true,
          observe: 'events'
      });
  }



}