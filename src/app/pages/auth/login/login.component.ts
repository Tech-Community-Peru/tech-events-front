import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {Router, RouterLink} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {AuthRequest} from '../../../shared/models/auth-request.model';
import {AuthService} from '../../../core/service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatCardModule, MatButtonModule, MatSnackBarModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  controlHasError(control: string, error:string){
    return this.loginForm.controls[control].hasError(error);
  }

  onSubmit(){
    if(this.loginForm.invalid){
      return;
    };

    const credentials: AuthRequest = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: () => {
        this.showSnackBar('Inicio de sesion exitoso');
        this.router.navigate(['/participante'])
      },
      error: () => {
        this.showSnackBar('Error en el inicio de sesion');
      },
    )};

  }
}
