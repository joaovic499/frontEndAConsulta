import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { TipoUsuario } from '../../login/tipoUsuario';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css'
})
export class MenuAdminComponent {

  constructor(private dialog: MatDialog, private cookieService: CookieService) {
    this.token = cookieService.get('token') || '';
  }

  private role: TipoUsuario | undefined;
  token: string;

  logout(): void{
    alert('Admin Deslogado com sucesso')
}
openModalCadastrarConsultas(){
  this.dialog.open(ModalComponent, {
    width: '700px',
    height: '330px'
  })

}

}
