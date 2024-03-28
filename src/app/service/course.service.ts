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

 /* course!:course
  url='http://localhost:8089/cours'*/
   constructor(private http :HttpClient) { }
   addCours(cours: course, idMatiere: string): Observable<course> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<course>(`${this.apiUrl}/addCours/${idMatiere}`, cours, { headers: headers });
  }
  /* getCourse(){
     return this.http.get(this.url+"/getCours");
   }
  postCourse(course: course) {
    return this.http.post(this.url + '/addCours', course, { headers: this.generateCorsHeaders() });
  }
   deleteCourse(id:string){
    return this.http.delete(`${this.url}/delete/${id}`);
  }
  modifierCourse(id:string , course:course){
    return this.http.put(`${this.url}/updateCours/${id}`,course);
  }
  getCourseTrier(){
    return this.http.get(this.url+"/findAllByOrderByDateDesc");
  }*/
  uploadPhoto(id: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload/${id}`, formData);
}

  
 /* getCourById(id:string ){
    return this.http.get(`${this.url}/get/${id}`);
  }
  getRessourceByCourId(id:string){
    return this.http.get(`${this.url}/getRessourcesByCourId/${id}`);

    
  }
  getPhoto(photo: string): string{
    const photoUrl = `${this.url}/download/${photo}`;

    return `${this.url}/download/${photo}`;
  }*/
  affecterRessourceAcour(id:string , ressource:Ressource){
    return this.http.post(`${this.apiUrl}/affecterRessourcesACour/${id}`,ressource);
  }
  uploadPhotoRessource(id: string, file: File): Observable<any> {
    const uploadUrl = `${this.apiUrl}/uploadRessource/${id}`;

    const formData: FormData = new FormData();
    formData.append('photo', file, file.name);

    return this.http.post(uploadUrl, formData);
  }
 /* findCoursByDateGreaterThan(){
    return this.http.get(`${this.url}/findCoursByDateGreaterThan`);

  }
 /* filterByNiveau(niveau:string){
    return this.http.get(`${this.url}/filterByNiveau/${niveau}`);
  }
  sendHtmlEmail(email:string , amount:any){
    return this.http.post(`${this.url}/sendHtmlEmail/${email}/${amount}`,{});
  }
  PdfGenerator(amount:any){
    return this.http.post(`${this.url}/PdfGenerator/${amount}`,{});

  }
  rechercheMultiCritere(search: String){
    return this.http.get(`${this.url}/findByNomCourOrDescription/${search}`);

  }*/

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
  
}
