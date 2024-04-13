
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
  search: string = '';
  courseRecente!:any
  pages: number[] = [1, 2, 3, 4, 5]; 
  courses: course[] = [];

  ngOnInit() {
    this.course=this.CourseService.getCourse().subscribe((data) => {
      this.course = data;
    },
    (error) => {
      console.error("Erreur lors de la récupération des données :", error);
    }
  );
  this.refreshCourses();

  }
  getphoto(photo :string){
    return this.CourseService.getPhoto(photo);
  }

  afficher(){
    console.log(this.course);
  }
 /* latestCourse(){
    this.CourseService.findCoursByDateGreaterThan().subscribe((data) => {
      this.courseRecente = data;
      console.log(this.courseRecente)
    },
    (error) => {
      console.error("Erreur lors de la récupération des données :", error);
    }
  );
  }*/

  rechercheParDescriptionCoursEtNomProfesseur(){
    this.course=new course();
this.course=this.CourseService.rechercheParDescriptionCoursEtNomProfesseur(this.search).subscribe((data) => {
  this.course = data;
},
(error) => {
  console.error("Erreur lors de la récupération des données :", error);
}
);
}
  delete(id: string) {
    const confirmed = window.confirm('Voulez-vous vraiment supprimer ce cours ?');
    if (confirmed) {
      this.CourseService.deleteCourse(id).subscribe(
        () => {
          console.log(`La course avec l'ID ${id} a été supprimée avec succès.`);
          this.refreshCourses(); // Actualiser la liste des cours après la suppression
        },
        (error) => {
          console.error(`Erreur lors de la suppression du cours avec l'ID ${id} :`, error);
        }
      );
    } else {
      console.log('Suppression du cours annulée.');
    }
  }
  
  refreshCourses() {
    this.CourseService.getCourse().subscribe(
      (data) => {
        this.course = data;
      },
      (error) => {
        console.error("Erreur lors de la récupération des données :", error);
      }
    );
  }
  

  
}
