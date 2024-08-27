import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})

export class MenuComponent {

  constructor(private router: Router, private dialog : MatDialog) {}

  logout(): void{
    alert('Paciente Deslogado com sucesso')
    this.router.navigate(['login']);
}

openModalCadastrarConsultasUsuario() {
  this.dialog.open(ModalUserComponent, {
    width: '700px',
    height: '330px'
  })
}

}
