import { Component } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { RessourceService } from 'src/app/service/ressource.service';
import { Ressource  } from 'src/app/model/Ressource';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent {
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  idRessource: string | null = null; // Ajoutez cette ligne pour stocker l'ID de la ressource

  constructor(private RessourceService: RessourceService) {}

  // define a function to upload files
  
  
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

// Dans course-details.component.ts
onUploadFiles(event: any): void {
  const files: FileList | null = event.target.files;
  if (files) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }
    
    this.RessourceService.upload(formData).subscribe(
      (httpEvent: HttpEvent<string[] | Blob>) => {
        if (httpEvent.type === HttpEventType.UploadProgress) {
          this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        } else if (httpEvent.type === HttpEventType.Response) {
          if (httpEvent.body instanceof Array) {
            this.fileStatus.status = 'done';
            for (const filename of httpEvent.body) {
              this.filenames.unshift(filename);
              // Vérifiez si idRessource est null avant d'appeler associateVideoWithRessource
           if (this.idRessource !== null) {
                 this.associateVideoWithRessource(this.idRessource, filename); // Associer le vidéo avec la ressource
           } else {
           console.error('ID de la ressource non défini.');
       }
            }
          }
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}


// Dans course-details.component.ts
associateVideoWithRessource(idRessource: string, videoFilename: string): void {
  this.RessourceService.associateVideoToRessource(idRessource, videoFilename).subscribe(
    () => {
      console.log(`Le vidéo avec le nom ${videoFilename} a été associé avec succès à la ressource ${idRessource}.`);
      // Actualiser la liste des ressources ou effectuer toute autre action nécessaire
    },
    (error) => {
      console.error(`Erreur lors de l'association du vidéo avec la ressource :`, error);
    }
  );
}


  /*private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
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
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!, 
                  {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
          // saveAs(new Blob([httpEvent.body!], 
          //   { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
          //    httpEvent.headers.get('File-Name'));
        }
        this.fileStatus.status = 'done';
        break;
        default:
          console.log(httpEvent);
          break;
      
    }
  }*/

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
          saveAs(blob, filename);
                    // saveAs(new Blob([httpEvent.body!], 
          //   { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
          //    httpEvent.headers.get('File-Name'));
        }
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
}