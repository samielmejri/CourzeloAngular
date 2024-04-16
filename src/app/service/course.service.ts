import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest, HttpEventType,HttpErrorResponse  } from '@angular/common/http';
import { course } from 'src/app/model/Course';
import { Observable } from 'rxjs';
import { Ressource } from '../model/Ressource';
import { tap } from 'rxjs/operators';

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

  deleteCourse(id: string): Observable<void> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete<void>(url);
  }
  modifierCourse(id: string, course: course) {
    return this.http.put(`${this.apiUrl}/updateCours/${id}`, course);
  }

  uploadPhoto(id: string, file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.apiUrl}/upload/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }


  getCoursById(id: string) {
    return this.http.get(`${this.apiUrl}/get/${id}`);
  }
 
  getPhoto(photo: string): string {
    const photoUrl = `${this.apiUrl}/download/${photo}`;
    return `${this.apiUrl}/download/${photo}`;
  }

  affecterRessourceAcour(id: string, ressource: Ressource) {
    return this.http.post(`${this.apiUrl}/affecterRessourcesACour/${id}`, ressource);
  }

  uploadPhotoRessource(id: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.apiUrl}/uploadRessource/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
  
    return this.http.request(req).pipe(
      tap(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            // Handle upload progress
            console.log(`Uploaded: ${Math.round((event.loaded / event.total) * 100)}%`);
          } else if (event instanceof HttpErrorResponse) {
            // Handle upload error
            console.error('Error uploading file:', event);
          } else if (event.type === HttpEventType.Response) {
            // Handle successful upload response
            console.log('File is completely uploaded!', event.body);
          }
        },
        (error: HttpErrorResponse) => {
          // Handle upload error
          console.error('Error uploading file:', error);
        }
      )
    );
  }
  

  sendHtmlEmail(email: string, amount: any) {
    return this.http.post(`${this.apiUrl}/sendHtmlEmail/${email}/${amount}`, {});
  }

   /*PdfGenerator(amount:any){
     return this.http.post(`${this.apiUrl}/PdfGenerator/${amount}`,{});
 
   }*/

   PdfGenerator(amount: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
    });
  
    return this.http.post(`${this.apiUrl}/PdfGenerator/${amount}`, {}, {
      headers: headers,
      responseType: 'arraybuffer'
    });
  }
  

  rechercheParDescriptionCoursEtNomProfesseur(search: String) {
    return this.http.get(`${this.apiUrl}/findByDescriptionCoursOrNomProfesseur/${search}`);

  }

  likeCourse(id: number): Observable<any> {
    const url = `${this.apiUrl}/like/${id}`;
    return this.http.post(url, {});
  }

  dislikeCourse(id: number): Observable<any> {
    const url = `${this.apiUrl}/dislike/${id}`;
    return this.http.post(url, {});
  }

  createPaymentIntent(amount: number) {
    return this.http.post<any>(`${this.apiUrl}/create-payment-intent`, { amount });
  }

  getAllCoursesSortedByPrice(sortOrder: string) {
    return this.http.get(`${this.apiUrl}/sortByPrice`, { params: { sortOrder } });
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
/*  getRessourceByCourId(id:string){
      return this.http.get(`${this.url}/getRessourcesByCourId/${id}`);
    }*/

     /* getCourseTrier() {
    return this.http.get(this.apiUrl + "/findAllByOrderByDateDesc");
  }*/

}
