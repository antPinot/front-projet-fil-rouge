import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent {

  mail!: String

  constructor(private authService : AuthService){}

  onSubmit(): void{
    this.authService.passwordResetToken(this.mail).subscribe();
  }

}
