import { Component, ViewChild, ElementRef } from '@angular/core';
import { RessourceService } from 'src/app/service/ressource.service';
import { course } from 'src/app/model/Course';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';
import { Ressource } from "src/app/model/Ressource";
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-add-ressource',
  templateUrl: './add-ressource.component.html',
  styleUrls: ['./add-ressource.component.css']
})
export class AddRessourceComponent {
  generateRandomString = (num: number | undefined) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1 = Math.random().toString(36).substring(0, num);
    return result1;
  }
 num!:number
course!:course
id!:any
ressource: Ressource = new Ressource();
constructor(private ac:ActivatedRoute,private courseService:CourseService,private ressourceService: RessourceService,private router: Router) {

}

ngOnInit() {
  this.ac.params.subscribe(params => {
    this.id = params['id'];
  });
}

save(f:NgForm){
 // console.log(this.course.niveau)
}
selectedFile: File | null = null;
onFileSelected(event: any): void {
  const fileInput = event.target as HTMLInputElement;

  if (fileInput.files && fileInput.files.length > 0) {
    this.selectedFile = fileInput.files[0];
  } else {
    this.selectedFile = null;
  }
}




affecterRessourceAcour() {
   

  this.ressource.idRessource = this.generateRandomString(8);
  console.log(this.ressource.nomRessource, "l id de ressource est " + this.ressource.idRessource);

  return this.courseService.affecterRessourceAcour(this.id, this.ressource).subscribe(
    () => {
      alert("Ressource ajouté !!");
      this.router.navigate(['/delete-course']);
    },
    (error) => {
      console.error("Erreur lors de l'ajout de la Ressource :", error);
    }
  );
}

// Dans votre méthode onUploadCourse
onUploadCourse(): void {
  if (this.selectedFile) {
    console.log(this.id); // Vérifiez si l'ID du cours est correct

    // Envoyer la requête avec les en-têtes appropriés
    this.courseService.uploadPhoto(this.id, this.selectedFile).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // Gérer l'événement de progression
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!', event);
          // Vérifier la réponse réelle et le statut ici
        }
      },
      error: (error: any) => {
        console.error('Error uploading file:', error);
      }
    });
  }
}

// Dans votre méthode onUploadRessource
onUploadRessource(): void {
  if (this.selectedFile) {
    console.log(this.id); // Vérifiez si l'ID du cours est correct

    // Envoyer la requête avec les en-têtes appropriés
    this.ressourceService.uploadRessource(this.id, this.selectedFile).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // Gérer l'événement de progression
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!', event);
          // Vérifier la réponse réelle et le statut ici
        }
      },
      error: (error: any) => {
        console.error('Error uploading file:', error);
      }
    });
  }
}
}