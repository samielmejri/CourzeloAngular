
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { course } from 'src/app/components/model/Course';
import { CourseService } from 'src/app/service/course.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-cours',
  templateUrl: './list-cours.component.html',
  styleUrls: ['./list-cours.component.css']
})
export class ListCoursComponent implements OnInit {
hideVideoForm() {
throw new Error('Method not implemented.');
}
uploadVideo(arg0: any) {
throw new Error('Method not implemented.');
}
isVideoFormVisible: any;
selectedCourseId: any;
  constructor(private CourseService: CourseService) { }
  course!: any
  listeCourse!: course[];
  search: string = '';
  courseRecente!: any
  pages: number[] = [1, 2, 3, 4, 5];
  courses: course[] = [];
  isLiked: { [key: string]: boolean } = {};
  sortOrder: string = 'asc';

  ngOnInit() {
    this.course = this.CourseService.getCourse().subscribe((data) => {
      this.course = data;
    },
      (error) => {
        console.error("Erreur lors de la récupération des données :", error);
      }
    );
    this.refreshCourses();
    this.loadCoursesSortedByPrice(); // Charger les cours triés par prix au démarrage du composant

  }
  getphoto(photo: string) {
    return this.CourseService.getPhoto(photo);
  }

  afficher() {
    console.log(this.course);
  }


  rechercheParDescriptionCoursEtNomProfesseur() {
    if (!this.search || this.search.trim() === '') {
     // Si la recherche est vide, récupérez tous les cours ou réinitialisez la variable this.course à la liste complète des cours
        // Exemple :
        // this.getAllCourses();  // Si vous avez une méthode pour récupérer tous les cours
        this.course = this.CourseService.getCourse().subscribe((data) => {
          this.course = data;
      },
      (error) => {
          console.error("Erreur lors de la récupération des données :", error);
      });
      return; // Arrêtez l'exécution de la méthode
  } 

    this.course = new course();
    this.course = this.CourseService.rechercheParDescriptionCoursEtNomProfesseur(this.search).subscribe((data) => {
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

  like(course: any) {
    console.log("Like button clicked for course ID:", course.id_cours);

    this.CourseService.likeCourse(course.id_cours).subscribe(
      () => {
        console.log("Course liked successfully.");
        this.isLiked[course.id_cours] = true;
        course.numLikes++;

        //  alert("Vous avez liké le cours!");
      },
      (error) => {
        console.error("Error liking course:", error);
      }
    );
  }

  dislike(course: any) {
    console.log("Dislike button clicked for course ID:", course.id_cours);

    this.CourseService.dislikeCourse(course.id_cours).subscribe(
      () => {
        console.log("Course disliked successfully.");
        this.isLiked[course.id_cours] = false;
        course.numLikes--;
        // alert("Vous avez disliké le cours!");
      },
      (error) => {
        console.error("Error disliking course:", error);
      }
    );
  }


  loadCoursesSortedByPrice() { // Removed sortOrder parameter
    this.CourseService.getAllCoursesSortedByPrice(this.sortOrder).subscribe( // Pass sortOrder here
      data => {
        this.course = data;
      },
      error => {
        console.error("Erreur lors du chargement des cours :", error);
      }
    );
  }


  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.loadCoursesSortedByPrice(); // Call without passing sortOrder
  }
}
