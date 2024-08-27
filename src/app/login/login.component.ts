import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TipoUsuario } from './tipoUsuario';
import { AuthLoginService } from '../auth-login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Corrigido de 'styleUrl' para 'styleUrls'
})


export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  private role: TipoUsuario | undefined;

  constructor(private formBuilder: FormBuilder, private authService: AuthLoginService, private router: Router) {}

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  login(): void {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authService.login(email, password).subscribe(
      loginOk => {
        if (loginOk) {
          const roleStr = this.authService.getRole();
            if(roleStr === 'ADMIN') {
              this.role = TipoUsuario.ADMIN
            } else {
              this.role = TipoUsuario.USER
            }

            const token = this.authService.getToken();
            const userRole = this.authService.getUserRole(token);
            alert('Login Feito com sucesso!')
            this.loginForm.reset();
            this.router.navigate(['home']);

          } else {
            alert("falha no login");
          }
        },
        error => {
        alert("Erro ao tentar logar: " + error.message);
        })

      }
}
