import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserRoleRequest} from "src/app/components/model/user/UserRoleRequest";
import {UserListDTO} from "src/app/components/model/user/UserListDTO";

@Injectable({
  providedIn: 'root'
})
export class PanelService {
  private baseUrl: string = 'http://localhost:8089/api/v1/admin';

  constructor(private http: HttpClient) {
  }

  getUsers(page: number, itemsPerPage: number): Observable<UserListDTO> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('sizePerPage', itemsPerPage.toString());
    return this.http.get<UserListDTO>(`${this.baseUrl}/users`, {params});
  }

  addRole(userRoleRequest: UserRoleRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/add/${userRoleRequest.userID}/${userRoleRequest.role}`, null);
  }

  removeRole(userRoleRequest: UserRoleRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/remove/${userRoleRequest.userID}/${userRoleRequest.role}`, null);
  }

  toggleBan(userRoleRequest: UserRoleRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/ban/${userRoleRequest.userID}`, null);
  }

  toggleEnable(userRoleRequest: UserRoleRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/enable/${userRoleRequest.userID}`, null);
  }
}
