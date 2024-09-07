import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {
  public registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      confirmpassword: ['']
    });
  }

  register(): void {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const name = this.registerForm.value.name;
    const confirmpassword = this.registerForm.value.confirmpassword;

    if (password !== confirmpassword) {
      alert("Senhas não conferem, tente novamente");
      return
    }

    this.http.post<any>("http://localhost:3000/auth/register", this.registerForm.value).pipe(
      tap(() => {
        alert("Usuário registrado com sucesso");
        this.registerForm.reset();
        this.router.navigate(['login']);
      }),

      catchError((error) => {
        if  (error. error.message == "Email ja cadastrado, tente novamente") {
          alert('Email ja cadastrado.')
        } else {
          alert("Erro ao registrar um usuário");
        }
          return of(null)
      })
    ).subscribe();
  }
}
