import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] 
})
export class LoginComponent {

  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(private userService: UserService, private fb: FormBuilder, private authService: AuthService, private router: Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(){
    if(this.loginForm.valid){
      const {email, password} = this.loginForm.value;
      this.userService.login(email, password).subscribe(
        (res) => {
          console.log(res);
          this.authService.setToken(res.token, res.loggedUser);
          this.router.navigate(['/']);
          this.loginError = null;
        },
        (err) => {
          console.log(err);
          this.loginError = 'Login failed. Please check your credentials and try again.'; // Message d'erreur
        }
      );
    } else {
      this.loginError = 'Please enter valid email and password.';
    }
  }
}
