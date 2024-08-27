import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { AuthLoginService } from '../../auth-login.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  form: FormGroup;
  tipo!: string;
  horario!: string;
  dia!: Date;
  medicoId!: string;

  constructor(private dialog: MatDialog, private cookieService: CookieService, private dialogRef: MatDialogRef<ModalComponent>, private authLogin: AuthLoginService) {
    // Inicialize o FormGroup e defina os FormControl
      this.form = new FormGroup({
      pacienteId: new FormControl(''),
      medicoId: new FormControl(''),
      tipo: new FormControl(''),
      data: new FormControl(new Date()),
      horario: new FormControl('')
    });
  }

  idDecodificado(){
    const token = this.cookieService.get('token')
    if (!token) {
      return null;
    }

    const decoded: any = jwtDecode(token);
    return decoded.id
  }

  closeModal() {
    this.dialogRef.close();
  }
}
