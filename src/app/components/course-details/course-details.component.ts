import { Component } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { RessourceService } from 'src/app/service/ressource.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent {
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };

  constructor(private RessourceService: RessourceService, private route: ActivatedRoute) {}

  // define a function to upload files
  
  onUploadFiles(event: any): void {
    const files: FileList | null = event.target.files;
    if (files) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('video', files[i], files[i].name);
      }
      
      const idRessource = this.route.snapshot.params['idRessource']; // récupérer l'ID de la ressource depuis l'URL

      this.RessourceService.upload(formData, idRessource).subscribe(
        (httpEvent: HttpEvent<string[] | Blob>) => {
          if (httpEvent.type === HttpEventType.UploadProgress) {
            this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
          } else if (httpEvent.type === HttpEventType.Response) {
            if (httpEvent.body instanceof Array) {
              this.fileStatus.status = 'done';
              for (const filename of httpEvent.body) {
                this.filenames.unshift(filename);
              }
            }
            this.resetStatus(); // Réinitialiser le statut une fois le chargement terminé
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.resetStatus(); // Réinitialiser le statut en cas d'erreur
        }
      );
    }
  }
   
  onDownloadFile(filename: string): void {
    console.log('Downloading file:', filename);
    this.RessourceService.download(filename).subscribe(
        event => {
            this.resportProgress(event, filename);
        },
        (error: HttpErrorResponse) => {
            console.log(error);
        }
    );
}
      
  private resportProgress(httpEvent: HttpEvent<string[] | Blob>, filename: string): void {
    switch(httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const name of httpEvent.body) {
            this.filenames.unshift(name);
          }
        } else {
          const blob = new Blob([httpEvent.body!], { type: `${httpEvent.headers.get('Content-Type')}` });
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!, 
          {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));      }
        this.fileStatus.status = 'done';
        break;
        default:
          console.log(httpEvent);
          break;
      
    }
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }

  private resetStatus(): void {
    this.fileStatus.status = '';
    this.fileStatus.requestType = '';
    this.fileStatus.percent = 0;
  }
}
