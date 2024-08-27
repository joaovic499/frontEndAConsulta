import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {
  public registerForm!: FormGroup;
  private users = [
    { email: 'joao@gmail.com', password: '123' },
    { email: 'admin@admin.com', password: '123' }
  ];

  constructor(private formBuilder: FormBuilder, private router: Router) { }

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
    const confirmpassword = this.registerForm.value.confirmpassword;

    if (password !== confirmpassword) {
      alert("Senhas não conferem, tente novamente");
      return;
    }

    // Verificação estática de e-mail existente
    const userExists = this.users.some(user => user.email === email);

    if (userExists) {
      alert('Email de usuário já cadastrado. Cadastre um usuário com outro email!');
    } else {
      // Simular registro do usuário
      this.users.push({ email, password });
      alert("Registrado com Sucesso");
      this.registerForm.reset();
      this.router.navigate(['login']);
    }
  }
}
