import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Departement} from "src/app/components/model/schedule/departement";
import {HttpClient} from "@angular/common/http";
import {FieldOfStudy} from "src/app/components/model/schedule/field-of-study";
import {Semester} from "src/app/components/model/schedule/semester";

@Injectable({
  providedIn: 'root'
})
export class SemesterService {
  semesters: Semester[] = [];
  private baseUrl = 'http://localhost:8089/api/semesters';
  private semestersSubject = new BehaviorSubject<Semester[]>([]);
  semester$: Observable<Semester[]> = this.semestersSubject.asObservable();
  constructor(private http: HttpClient) { }
  public getAllSemesters(): Observable<Semester[]> {
    console.log('Semesters:', this.semesters);
    return this.http.get<Semester[]>(this.baseUrl);
  }
}
