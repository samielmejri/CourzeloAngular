import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-niveau',
  templateUrl: './niveau.component.html',
  styleUrls: ['./niveau.component.scss']
})
export class NiveauComponent  {

  NiveauArray: any[] = [];
  nom_niveau: string = "";
  currentNiveauID: string = "";
  isUpdateFormActive = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getAllNiveaux();
  }

  register() {
    let bodyData = {
      "nom_niveau": this.nom_niveau
    };

    this.http.post("http://localhost:8089/niveau/addNiveau", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Niveau ajouté avec succès");
      this.getAllNiveaux();
      this.nom_niveau = '';
    });
  }

  getAllNiveaux() {
    this.http.get("http://localhost:8089/niveau/getAllNiveaux").subscribe((resultData: any) => {
      console.log(resultData);
      this.NiveauArray = resultData;
    }, error => {
      console.error("Error fetching niveaux:", error);
      // Handle error here
    });
  }

  setUpdate(data: any) {
    console.log(data);
    this.nom_niveau = data.nom_niveau;
    this.currentNiveauID = data.id_niveau;
    console.log("Current Niveau ID: ", this.currentNiveauID);

    if (this.currentNiveauID) {
      this.isUpdateFormActive = true;
    } else {
      alert("ID niveau non trouvé");
    }
  }

  UpdateRecords() {
    let bodyData = {
      "nom_niveau": this.nom_niveau,
      "id_niveau": this.currentNiveauID
    };

    this.http.put("http://localhost:8089/niveau/updateNiveau/" + this.currentNiveauID, bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Niveau mis à jour avec succès");
      this.getAllNiveaux();
      this.nom_niveau = '';
      this.currentNiveauID = '';
      this.isUpdateFormActive = false;
    });
  }

  save() {
    if (this.currentNiveauID === '') {
      this.register();
    } else {
      this.UpdateRecords();
    }
  }

  setDelete(data: any) {
    this.http.delete("http://localhost:8089/niveau/delete/" + data.id_niveau, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Niveau supprimé ");
      this.getAllNiveaux();
      this.nom_niveau = '';
    });
  }

  navigateToMatiere() {
    this.router.navigate(['/matiere']);
  }
}
