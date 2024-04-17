import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "../../../service/user/auth/authentication.service";
import { UpdateService } from "../../../service/user/profile/update.service";
import { TokenStorageService } from "../../../service/user/auth/token-storage.service";
import { QRCodeResponse } from "../../model/user/QRCodeResponse";
import { MatDialog } from "@angular/material/dialog";
import { QaDialogComponent } from "../qa-dialog/qa-dialog.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @Output() userInfoChanged = new EventEmitter<void>();

  loading = false;
  user: any = {};
  qrCodeImage: string = '';
  selectedFile: File | undefined;

  nameForm: FormGroup;
  emailForm: FormGroup;
  photoForm: FormGroup;
  verificationForm: FormGroup;
  tfaForm: FormGroup;
  passwordForm: FormGroup;
  deleteForm: FormGroup;

  messageSuccess: string = '';
  messageError: string = '';
  showEmailForm: boolean = true;
  showVerification: boolean = false;


  constructor(
    private token: TokenStorageService,
    private updateService: UpdateService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private authService: AuthenticationService,
    public dialog: MatDialog
  ) {
    this.nameForm = this.formBuilder.group({
      name: ['', [Validators.maxLength(20), Validators.minLength(3)]],
      lastName: ['', [Validators.maxLength(20), Validators.minLength(3)]],
    });

    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.email]],
    });

    this.photoForm = this.formBuilder.group({
      photo: ['', [Validators.required]],
    });

    this.verificationForm = this.formBuilder.group({
      code: ['', [Validators.maxLength(4), Validators.minLength(4)]],
    });

    this.tfaForm = this.formBuilder.group({
      verificationCode: ['', [Validators.required]],
    });

    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
    });

    this.deleteForm = this.formBuilder.group({
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getMyInfo();
  }

  toggleLoading() {
    this.loading = !this.loading;
  }

  getMyInfo() {
    this.updateService.getMyInfo().subscribe(
      response => {
        this.user = response;
        console.log(response);
      }
    );
  }

  checkUserProfileImage() {
    if (!this.user.photoID) {
      const lastNotification = localStorage.getItem('lastImageNotification');
      const now = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds
      if (!lastNotification || now - Number(lastNotification) > oneDay) {
        this.toaster.info('Enhance your profile by adding a profile picture.');
        localStorage.setItem('lastImageNotification', String(now));
      }
    }
  }

  checkUserProfileTwoFactorAuth() {
    if (!this.user.twoFactorAuthEnabled) {
      const lastNotification = localStorage.getItem('lastTwoFactorAuthNotification');
      const now = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000;
      if (!lastNotification || now - Number(lastNotification) > oneDay) {
        this.toaster.info('Secure your account by enabling two factor authentication.');
        localStorage.setItem('lastTwoFactorAuthNotification', String(now));
      }
    }
  }

  resetSuccessAlert() {
    this.toaster.clear();
  }

  resetErrorAlert() {
    this.toaster.clear();
  }

  enableTwoFactorAuth() {
    const verificationCode = this.tfaForm.get('verificationCode')!.value;
    this.authService.enableTwoFactorAuth(verificationCode).subscribe(
      data => {
        console.log(data);
        this.toaster.success('Two factor authentication enabled successfully', 'Success');
        this.getMyInfo();
      },
      error => {
        console.log(error);
        this.toaster.error('Error enabling two factor authentication', 'Error');
      }
    );
  }

  generateTwoFactorAuthQrCode() {
    this.authService.generateTwoFactorAuthQrCode().subscribe(
      (data: QRCodeResponse) => {
        this.qrCodeImage = 'data:image/png;base64,' + data.qrCodeImage;
        this.toaster.success('QR code generated successfully', 'Success');
      },
      error => {
        console.log(error);
        this.toaster.error('Error generating QR code', 'Error');
      }
    );
  }

  disableTwoFactorAuth() {
    this.authService.disableTwoFactorAuth().subscribe(
      data => {
        console.log(data);
        this.toaster.success('Two factor authentication disabled successfully', 'Success');
        this.getMyInfo();
      },
      error => {
        console.log(error);
        this.toaster.error('Error disabling two factor authentication', 'Error');
      }
    );
  }

  changeName() {
    if (this.nameForm.valid) {
      const nameRequest = this.nameForm.value;
      console.log(nameRequest);
      this.updateService.changeName(nameRequest).subscribe(
        data => {
          console.log(data);
          this.getMyInfo();
          this.toaster.success("Name updated successfully", "Success");
          this.userInfoChanged.emit();
        },
        error => {
          console.log("update name error :", error);
          this.toaster.error(error.error.msg, "Error");
        }
      );
    }
  }

  changePhoto() {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      console.log(formData);
      this.updateService.changePhoto(this.selectedFile).subscribe(
        progress => {
          console.log(progress);
          if (progress === 100) {
            this.toaster.success("Photo updated successfully", "Success");
            this.selectedFile = undefined;
            this.userInfoChanged.emit();
          }
        },
        error => {
          console.log(error);
          this.toaster.error("Error updating photo", "Error");
        }
      );
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  confirmDelete(): void {
    if (this.deleteForm.valid) {
      if (confirm('Are you sure you want to delete your account?')) {
        this.deleteAccount();
      }
    }
  }

  deleteAccount(): void {
    const password = this.deleteForm.get('password')!.value;
    this.updateService.deleteAccount({ password }).subscribe(
      data => {
        console.log(data);
        console.log('Account deleted successfully!');
        this.toaster.success("Account deleted successfully", "Success");
        // Redirect or perform logout action
      },
      error => {
        console.log("delete account error :", error);
        this.toaster.error(error.error.msg, "Error");
        console.log(error);
      }
    );
  }

  changePassword() {
    if (this.passwordForm.valid) {
      const passwordRequest = this.passwordForm.value;
      console.log(passwordRequest);
      this.updateService.changePassword(passwordRequest).subscribe(
        data => {
          console.log(data);
          this.toaster.success("Password updated successfully", "Success");
        },
        error => {
          console.log("update password error :", error);
          this.toaster.error(error.error.msg, "Error");
        }
      );
    }
  }

  sendVerificationCode() {
    if (this.emailForm.valid) {
      this.updateService.sendVerificationCode().subscribe(
        (response: any) => {
          console.log('Verification code sent successfully:', response);
          this.toaster.success('Verification code sent successfully', 'Success');
        },
        (error: any) => {
          console.error('Error sending verification code:', error);
          this.toaster.error('Error sending verification code', 'Error');
        }
      );
    }
  }

  changeEmail() {
    if (this.verificationForm.valid) {
      const emailRequest = {
        email: this.emailForm.get('email')!.value,
        code: +this.verificationForm.get('code')!.value
      };
      this.updateService.changeEmail(emailRequest).subscribe(
        (response: any) => {
          console.log('Email Changed successfully Logging out ....:', response);
          this.toaster.success('Email Changed successfully Logging out ....', 'Success');
          // Redirect or perform logout action
        },
        (error: any) => {
          this.toaster.error('Error changing email', 'Error');
          console.error('Error sending verification code:', error);
        }
      );
    }
  }

  openDialog(): void {
    this.dialog.open(QaDialogComponent);
  }
}
