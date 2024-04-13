import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';
import { HttpClient } from '@angular/common/http';
import { Stripe } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  stripe: any;
  card: any;
  clientSecret: string | null = null;
  amount: any;
  email: string = '';
  stripePromise: Promise<any>;
  url = "http://localhost:8089/cours";

  constructor(
    private http: HttpClient,
    private ac: ActivatedRoute,
    private courseService: CourseService
  ) {
    this.stripePromise = loadStripe('pk_test_51OrVypCBYwUBNRKedNN0uVHaivc3s8zWruJ8qvr3dWgWdcQ8DgBvAsfD1k5OokjERNFfRGRYQKWmvsCKzpQgl4e300NyNkY1qp');
  }

  async ngOnInit() {
    this.amount = this.ac.snapshot.paramMap.get('prix');
    this.stripe = await this.stripePromise;
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element');
  }

  async pay() {
    if (this.email.trim() === '') {
      console.error("L'email est vide. Veuillez saisir une adresse e-mail valide.");
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
            console.log("Réponse du backend :", data); // Affiche la réponse complète
            
            if (data && data.message === 'success') { // Vérifiez le champ 'message' ou ajustez selon le backend
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
            }
          },
          (stripeError) => {
            console.error("Erreur lors de l'appel au service Stripe :", stripeError);
          }
        );
    } catch (e) {
      console.error("Erreur lors de la création du token Stripe :", e);
    }
  }
  
  
}
