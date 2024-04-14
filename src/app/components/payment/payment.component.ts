import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Stripe, StripeCardElement, loadStripe } from '@stripe/stripe-js';
import { HttpErrorResponse } from '@angular/common/http';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  stripe: Stripe | null = null;
  card: StripeCardElement | null = null;
  clientSecret: string | null = null;
  amount: any;
  email: string = '';
  url = "http://localhost:8089/cours";

  constructor(
    private http: HttpClient,
    private ac: ActivatedRoute,
    private courseService: CourseService // Injection du service

  ) { }

  async ngOnInit() {
   // this.amount = this.ac.snapshot.paramMap.get('prix');
    this.stripe = await loadStripe('pk_test_51OrVypCBYwUBNRKedNN0uVHaivc3s8zWruJ8qvr3dWgWdcQ8DgBvAsfD1k5OokjERNFfRGRYQKWmvsCKzpQgl4e300NyNkY1qp');
    if (this.stripe) {
      const elements = this.stripe.elements();
      this.card = elements.create('card');
      this.card.mount('#card-element');
    }
  }

  async pay() {
    if (this.email.trim() === '') {
      console.error("L'email est vide. Veuillez saisir une adresse e-mail valide.");
      return;
    }
  
    if (!this.stripe || !this.card) {
      console.error("Stripe ou la carte n'est pas initialisée.");
      return;
    }
  
    try {
      const { token, error } = await this.stripe.createToken(this.card);
      
      if (error) {
        console.error(error.message);
        return;
      }
  
      this.http.post<any>(`${this.url}/stripe/${this.amount}`, { token: token.id, email: this.email })
        .subscribe(
          data => {
            console.log("Réponse du backend :", data);
            
            if (data && data.message === 'success') {
              this.clientSecret = data.clientSecret;
              this.courseService.sendHtmlEmail(this.email, this.amount).subscribe(
                () => {
                  console.log(this.email);
                  alert("Email envoyé !!");
                },
                (emailError) => {
                  console.error("Erreur lors de l'envoi de l'email :", emailError);
                }
              );
            } else {
              console.error("Erreur lors de l'appel au service Stripe :", data.message);
              alert("Une erreur est survenue lors du paiement. Veuillez réessayer.");
            }
          },
          (stripeError) => {
            console.error("Erreur lors de l'appel au service Stripe :", stripeError);
            alert("Une erreur est survenue lors du paiement. Veuillez réessayer.");
          }
        );
    } catch (e) {
      console.error("Une erreur est survenue lors de la création du token :", e);
      alert("Une erreur est survenue lors du paiement. Veuillez réessayer.");
    }
  }
}  