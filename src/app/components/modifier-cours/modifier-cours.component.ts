import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';
import { course } from 'src/app/model/Course';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modifier-cours',
  templateUrl: './modifier-cours.component.html',
  styleUrls: ['./modifier-cours.component.css']
})
export class ModifierCoursComponent {
  course!:course
  id!:any
  courses!:any
  ressource!:any
constructor(private ac:ActivatedRoute,private courseService:CourseService,private router: Router) {
  
}

  ngOnInit(){
    this.course=new course();
    this.id=this.ac.snapshot.paramMap.get('id');

  }
  save(f:NgForm){
  }
  modifier(){
    console.log(this.id)
    this.courseService.modifierCourse(this.id,this.course).subscribe(
      () => {
        alert("Cours modifié !");
        this.router.navigate(['/delete-course']);

      },
      (error) => {
        console.error("Erreur lors de l'ajout cours  :", error);
      }
    );
  }
  getcoursById(){

    return this.courseService.getCoursById(this.id).subscribe((data) => {
      this.courses = data;
      console.log(this.courses);
    },
    (error) => {
      console.error("Erreur lors de la récupération des données :", error);
    }
  );
     
  }
}
