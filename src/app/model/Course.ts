import { Ressource } from "./Ressource";

export class course {
   id_cours!:string;
   nomCours!: string;
   nomProfesseur!: string;
   descriptionCours!: string;
   dateInscription!: Date;
   // niveau!:string;
    matiere!: any;
    ressource!:Ressource[];
    photo!:string;
    prix!:any
  }