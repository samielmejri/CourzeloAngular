import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/service/user/auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userFullName: string = '';

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setUserFullName();
  }

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    return this.tokenStorageService.isAuthenticated();
  }

  // Method to perform logout
  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
  }

  // Method to set the user's full name
  private setUserFullName(): void {
    const user = this.tokenStorageService.getUser();
    if (user && user.name && user.lastname) {
      this.userFullName = `${user.name} ${user.lastname}`;
    }
  }
}
