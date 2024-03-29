// list-cours.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { course } from 'src/app/model/Course';
import { CourseService } from 'src/app/service/course.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-cours',
  templateUrl: './list-cours.component.html',
  styleUrls: ['./list-cours.component.css']
})
export class ListCoursComponent implements OnInit {
  constructor(private CourseService:CourseService){}
  course!:any
  listeCourse!:course[];
  search="";
  courseRecente!:any
  pages: number[] = [1, 2, 3, 4, 5]; // Exemple de tableau de numéros de pages

  ngOnInit() {
    this.course=this.CourseService.getCourse().subscribe((data) => {
      this.course = data;
    },
    (error) => {
      console.error("Erreur lors de la récupération des données :", error);
    }
  );
  
  }
  getphoto(photo :string){
    return this.CourseService.getPhoto(photo);
  }

  afficher(){
    console.log(this.course);
  }
  latestCourse(){
    this.CourseService.findCoursByDateGreaterThan().subscribe((data) => {
      this.courseRecente = data;
      console.log(this.courseRecente)
    },
    (error) => {
      console.error("Erreur lors de la récupération des données :", error);
    }
  );
  }

}
