
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { course } from 'src/app/components/model/Course';
import { CourseService } from 'src/app/service/course.service';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from 'src/app/service/user/auth/token-storage.service'; // Import TokenStorageService


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
  constructor(private CourseService: CourseService,
    private tokenStorageService: TokenStorageService
  ) { }
  course!: any
  listeCourse!: course[];
  search: string = '';
  courseRecente!: any
  pages: number[] = [1, 2, 3, 4, 5];
  courses: course[] = [];
  isLiked: { [key: string]: boolean } = {};
  isDisliked: { [key: string]: boolean } = {};
  sortOrder: string = 'asc';
  userId: string = '';

  ngOnInit() {
    this.userId = String(this.tokenStorageService.getUser().id);
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

    // Check if the course is already liked
    if (!this.isLiked[course.id_cours]) {
        // If not liked, like the course
        this.CourseService.likeCourse(this.userId, course.id_cours).subscribe(
            () => {
                console.log("Course liked successfully.");
                this.isLiked[course.id_cours] = true;
                localStorage.setItem(`liked_course_${course.id_cours}`, 'true'); // Save liked course in local storage
                course.numLikes++;

                // Remove blue color from dislike button
                this.isDisliked[course.id_cours] = false;
            },
            (error) => {
                console.error("Error liking course:", error);
            }
        );
    } else {
        // If already liked, undo the like
        this.CourseService.dislikeCourse(this.userId, course.id_cours).subscribe(
            () => {
                console.log("Course unliked successfully.");
                this.isLiked[course.id_cours] = false;
                localStorage.removeItem(`liked_course_${course.id_cours}`); // Remove liked course from local storage
                course.numLikes--;
            },
            (error) => {
                console.error("Error unliking course:", error);
            }
        );
    }
}

dislike(course: any) {
    console.log("Dislike button clicked for course ID:", course.id_cours);

    // Check if the course is already disliked
    if (!this.isDisliked[course.id_cours]) {
        // If not disliked, dislike the course
        this.CourseService.dislikeCourse(this.userId, course.id_cours).subscribe(
            () => {
                console.log("Course disliked successfully.");
                this.isDisliked[course.id_cours] = true;
                localStorage.setItem(`disliked_course_${course.id_cours}`, 'true'); // Save disliked course in local storage
                course.numLikes--;

                // Remove red color from like button
                this.isLiked[course.id_cours] = false;
            },
            (error) => {
                console.error("Error disliking course:", error);
            }
        );
    } else {
        // If already disliked, undo the dislike
        this.CourseService.likeCourse(this.userId, course.id_cours).subscribe(
            () => {
                console.log("Course undisliked successfully.");
                this.isDisliked[course.id_cours] = false;
                localStorage.removeItem(`disliked_course_${course.id_cours}`); // Remove disliked course from local storage
                course.numLikes++;
            },
            (error) => {
                console.error("Error undisliking course:", error);
            }
        );
    }
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
