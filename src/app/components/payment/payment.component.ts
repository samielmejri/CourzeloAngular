import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  clientSecret: string | null = null;
  constructor(private http: HttpClient, private ac: ActivatedRoute, private courseService: CourseService) { }
  amount: any
  email!: string
  courses!: any

  url = "http://localhost:8089/cours"
  ngOnInit() {
    this.amount = this.ac.snapshot.paramMap.get('prix');
  }

  pay(amountee: number) {
    this.http.post<any>(`${this.url}/stripe/${this.amount}`, {}).subscribe(data => {
      this.clientSecret = data;
    });
    this.courseService.sendHtmlEmail(this.email, this.amount).subscribe(
      () => {
        console.log(this.email)
        alert("email envoyé !!");
      },
      (error) => {
        console.error("Erreur lors de l'envoie de mail :", error);
      }
    );
  }

  pdfGenerator() {
    this.courseService.PdfGenerator(this.amount).subscribe(
      (data) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      },
      (error) => {
        console.error("Erreur lors de l'envoi de pdf :", error);
        if (error.error instanceof ErrorEvent) {
          // Erreur côté client
          alert("Erreur côté client : " + error.error.message);
        } else {
          // Erreur côté serveur
          alert("Erreur côté serveur : " + error.message);
        }
      }
    );
  }


}



