import { Component, OnInit } from '@angular/core';
import { UpdateService } from "../../../service/user/profile/update.service";
import { LoginResponse } from "../../model/user/LoginResponse";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userPhotoUrl: string = 'assets/default-image.jpg'; // Default image URL
  isMenuOpen: boolean = false;
  isSuperAdminMenuOpen: boolean = false;
  isAdminMenuOpen: boolean = false;
  loginResponse: LoginResponse = {};

  constructor(private updateService: UpdateService) {}

  toggleSuperAdminMenu() {
    this.isSuperAdminMenuOpen = !this.isSuperAdminMenuOpen;
  }

  toggleAdminMenu() {
    this.isAdminMenuOpen = !this.isAdminMenuOpen;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {
    this.getMyInfo();
  }

  getMyInfo() {
    this.updateService.getMyInfo().subscribe(
      (response: LoginResponse) => {
        this.loginResponse = response;
        if (this.loginResponse.photoID) {
          this.getImage();
        }
      },
      (error: any) => {
        console.error('Error fetching user info:', error);
      }
    );
  }

  getImage() {
    this.updateService.getPhoto(this.loginResponse.photoID!).subscribe(
      (data: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.userPhotoUrl = reader.result as string;
        };
        reader.readAsDataURL(data);
      },
      (error: any) => {
        console.error('Error fetching user photo:', error);
      }
    );
  }
}
