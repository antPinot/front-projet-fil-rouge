import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IPasswordReset } from '../../models/IPasswordReset';
import { tap } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm!: FormGroup;

  passwordReset: IPasswordReset = {
  }

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {

    this.passwordReset.passwordToken = this.route.snapshot.queryParamMap.get('token');

    this.resetPasswordForm = this.formBuilder.group({
      password: [null, Validators.required],
      passwordConfirm: [null, Validators.required]
    });
  }

  onSubmitForm(): void {

    if (this.resetPasswordForm.value.password === this.resetPasswordForm.value.passwordConfirm) {
      this.passwordReset.newPassword = this.resetPasswordForm.value.password;
      console.log(`${this.passwordReset.passwordToken}   ${this.passwordReset.newPassword}`)
      this.authService.passwordReset(this.passwordReset).pipe(
        tap(() => this.router.navigateByUrl("../auth"))
      ).subscribe();
    }
  }


}
