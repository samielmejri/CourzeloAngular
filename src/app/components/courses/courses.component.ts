import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { CourseService } from 'src/app/service/course.service';
import { RessourceService } from 'src/app/service/ressource.service';
import { course } from 'src/app/model/Course'; // Ensure correct import
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  selectedFiles: File[] = [];
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
  course: course = new course(); // Ensure correct declaration

  constructor(private courseService: CourseService, private ressourceService: RessourceService, private http: HttpClient) {}

  ngOnInit() {}

 /* save(f: NgForm) {
    console.log(this.httpOptions);
  }*/
  save(f: NgForm) {
    if (f.valid) { // Check if the form is valid
      this.ajouter(); // Call the add method only if the form is valid
    } else {
      console.error("Form is invalid. Cannot add course.");
    }
  }
  
  
  

 ajouter() {
    const idMatiere = "ID_DE_LA_MATIERE";
    this.courseService.addCours(this.course, idMatiere).subscribe(
      () => {
        alert("Cours ajouté !!");
      },
      (error) => {
        console.error("Erreur lors de l'ajout de la course :", error);
      }
    );
  }
  

  continueToNextSection() {
    const basicInfoSection = document.getElementById('basic-info-section');
    const coursesMediaSection = document.getElementById('courses-media-section');
    if (basicInfoSection && coursesMediaSection) {
      basicInfoSection.style.display = 'none';
      coursesMediaSection.style.display = 'block';
    } else {
      console.error("One or both sections not found.");
    }
  }
}
