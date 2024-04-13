import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { course } from 'src/app/model/Course';
import { Observable } from 'rxjs';
import { Ressource } from '../model/Ressource';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:8089/cours';

  constructor(private http: HttpClient) { }

  addCours(cours: course, idMatiere: string): Observable<course> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<course>(`${this.apiUrl}/addCours/${idMatiere}`, cours, { headers: headers });
  }

  getCourse(): Observable<course[]> {
    return this.http.get<course[]>(`${this.apiUrl}/getCours`);
  }
  /*   deleteCourse(id:string){
      return this.http.delete(`${this.apiUrl}/delete/${id}`);
    }*/
  deleteCourse(id: string): Observable<void> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete<void>(url);
  }
  modifierCourse(id: string, course: course) {
    return this.http.put(`${this.apiUrl}/updateCours/${id}`, course);
  }
  getCourseTrier() {
    return this.http.get(this.apiUrl + "/findAllByOrderByDateDesc");
  }
  uploadPhoto(id: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload/${id}`, formData);
  }


  getCoursById(id: string) {
    return this.http.get(`${this.apiUrl}/get/${id}`);
  }
  /*  getRessourceByCourId(id:string){
      return this.http.get(`${this.url}/getRessourcesByCourId/${id}`);
    }*/
  getPhoto(photo: string): string {
    const photoUrl = `${this.apiUrl}/download/${photo}`;

    return `${this.apiUrl}/download/${photo}`;
  }

  affecterRessourceAcour(id: string, ressource: Ressource) {
    return this.http.post(`${this.apiUrl}/affecterRessourcesACour/${id}`, ressource);
  }
  uploadPhotoRessource(id: string, file: File): Observable<any> {
    const uploadUrl = `${this.apiUrl}/uploadRessource/${id}`;

    const formData: FormData = new FormData();
    formData.append('photo', file, file.name);

    return this.http.post(uploadUrl, formData);
  }
  sendHtmlEmail(email: string, amount: any) {
    return this.http.post(`${this.apiUrl}/sendHtmlEmail/${email}/${amount}`, {});
  }

  /* findCoursByDateGreaterThan(){
     return this.http.get(`${this.apiUrl}/findCoursByDateGreaterThan`);
 
   }*/

  /* PdfGenerator(amount:any){
     return this.http.post(`${this.url}/PdfGenerator/${amount}`,{});
 
   }*/
  rechercheParDescriptionCoursEtNomProfesseur(search: String) {
    return this.http.get(`${this.apiUrl}/findByDescriptionCoursOrNomProfesseur/${search}`);

  }

  // Méthode pour générer les en-têtes CORS
  private generateCorsHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200', // Ajoutez votre origin autorisé ici
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Méthodes autorisées
      'Access-Control-Allow-Headers': '*', // En-têtes autorisés
      'Access-Control-Allow-Credentials': 'true', // Autoriser les cookies
      'Access-Control-Max-Age': '3600' // Durée de validité en secondes
    });
    return headers;
  }



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
