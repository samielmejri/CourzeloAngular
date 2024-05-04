import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType} from "@angular/common/http";
import {JsonResponse} from "src/app/components/model/user/JsonResponse";
import {PasswordRequest} from "src/app/components/model/user/PasswordRequest";
import {NameRequest} from "src/app/components/model/user/NameRequest";
import {EmailRequest} from "src/app/components/model/user/EmailRequest";
import {map, Observable} from "rxjs";
import {DeleteAccountRequest} from "src/app/components/model/user/DeleteAccountRequest";
import {LoginResponse} from "src/app/components/model/user/LoginResponse";
import {UserAddress} from "src/app/components/model/user/UserAddress";
import {UserContact} from "src/app/components/model/user/UserContact";
import {UserResponse} from "src/app/components/model/user/UserResponse";
import {UserListDTO} from "src/app/components/model/user/UserListDTO";
import {SearchDTO} from "src/app/components/model/user/SearchDTO";

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private baseUrl: string = 'http://localhost:8089/api/v1/user';

  constructor(private http: HttpClient) {
  }
  getCountries(): Observable<string[]> {
    return this.http.get<any[]>('/assets/countries.json').pipe(
      map(countries => countries.map(country => country.name))
    );
  }
  getStates(countryCode: string): Observable<any> {
    return this.http.get<any[]>('/assets/countries.json').pipe(
      map(countries => countries.find(country => country.name === countryCode)?.states)
    );
  }
  updateShowPhone(): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/showPhone`, null);
  }

  updateShowAddress(): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/showAddress`, null);
  }

  updateShowBirthDate(): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/showBirthDate`, null);
  }

  changePassword(passwordRequest: PasswordRequest) {
    return this.http.patch<JsonResponse>(`${this.baseUrl}/update/password`, passwordRequest)
  }

  changeEmail(emailRequest: EmailRequest) {
    return this.http.post(`${this.baseUrl}/update/email`, emailRequest);
  }

  changeProfile(nameRequest: NameRequest) {
    return this.http.patch<JsonResponse>(`${this.baseUrl}/update/profile`, nameRequest);
  }
  updateSkill(skills: string[]): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/skill`, null, {params: {skills: skills.join(',')}});
  }
  getSkills(): Observable<string[]> {
    return this.http.get<{ skills: string[] }>('/assets/skills.json').pipe(
      map(response => response.skills)
    );
  }

  sendVerificationCode(): Observable<any> {
    return this.http.post(`${this.baseUrl}/sendVerificationCode`, null);
  }
  searchUsers(search:string,page: number): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.baseUrl}/search`, {params: {keyword: search, page: page.toString()}});
  }

  changePhoto(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/update/photo`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => this.getUploadProgress(event)),
    );
  }

  getPhoto(photoId: string) {
    return this.http.get(`${this.baseUrl}/photo/${photoId}`, {responseType: 'blob'});
  }
  saveSearch(search: SearchDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/saveSearch`, search);
  }
  getSearches(query: string): Observable<SearchDTO[]> {
    return this.http.get<SearchDTO[]>(`${this.baseUrl}/searches`, {params: {query: query}});
  }

  getMyInfo() {
    return this.http.get<UserResponse>(`${this.baseUrl}/myInfo`);
  }
  getMyContactInfo(){
    return this.http.get<UserContact>(`${this.baseUrl}/myContactInfo`);
  }

  deleteAccount(password: DeleteAccountRequest) {
    return this.http.post(`${this.baseUrl}/delete`, password);
  }
  updateUserContact(userContact: UserContact): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/contact`, userContact);
  }

  private getUploadProgress(event: any): number | null {
    if (event.type === HttpEventType.UploadProgress) {
      const percentDone = Math.round((event.loaded / event.total) * 100);
      return percentDone;
    }
    return null;
  }
}
