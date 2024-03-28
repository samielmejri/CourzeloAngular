import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Ressource } from '../model/Ressource';
import { Observable } from 'rxjs';

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

  uploadRessource(id: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    // Créer une nouvelle instance HttpHeaders et définir le type de contenu
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');

    return this.http.post(`${this.apiUrl}/uploadRessource/${id}`, formData, { headers, withCredentials: true, reportProgress: true, observe: 'events' });
  }



}
