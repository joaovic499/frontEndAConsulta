import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { AuthLoginService } from '../../auth-login.service';
import moment from 'moment';


interface Consulta {
  value: string;
  viewValue: String;
}

interface Horario {
  value: string;
  viewValue: String;
  disabled?: boolean;
}

interface Doutor {
  value: string;
  viewValue: String;
}

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrl: './modal-user.component.css',
  providers: [],
})
export class ModalUserComponent implements OnInit {

  diaAtual: any = new Date()
  form: FormGroup;
  selectedMatDate!: Date;
  formatoData! : any

  consultas: Consulta[] = [
    {value: 'EXAME_SANGUE', viewValue: 'Exame de Sangue'},
    {value: 'EXAME_VISTA', viewValue: 'Exame de Vista'},
  ]

  horarios: Horario[] = [
    {value: '08:00', viewValue: '08:00'},
    {value: '09:00', viewValue: '09:00'},
    {value: '10:00', viewValue: '10:00'},
    {value: '11:00', viewValue: '11:00'},
    {value: '12:00', viewValue: '12:00'},
    {value: '13:00', viewValue: '13:00'},
    {value: '14:00', viewValue: '14:00'},
    {value: '15:00', viewValue: '15:00'},
    {value: '16:00', viewValue: '16:00'},
    {value: '17:00', viewValue: '17:00'},
    {value: '18:00', viewValue: '18:00'},
    {value: '19:00', viewValue: '19:00'},
  ]

  doutores: Doutor[] = [
    {value:'66c535e136a72a1698d38386', viewValue: 'Mario Sérgio de Oliveira'}
  ]

  constructor(private dialog: MatDialog, private cookieService: CookieService, private dialogRef: MatDialogRef<ModalUserComponent>, private authLogin: AuthLoginService) {
    this.form = new FormGroup({
      medicoId: new FormControl(''),
      tipo: new FormControl(''),
      dia: new FormControl(null),
      horario: new FormControl('')
    });

  }
  ngOnInit(): void {
    this.loadHorariosDisponiveis();
    this.form.get('dia')?.valueChanges.subscribe(() => {
      this.loadHorariosDisponiveis();
    })
  }

  idDecodificado(){
    const token = this.cookieService.get('token')
    if(!token) {
      return null;
    }

    const decoded: any = jwtDecode(token)
    return decoded.id
  }


  closeModal() {
    this.dialogRef.close();
  }

  sucesso() {
    this.authLogin.messageSucess('Consulta marcada com sucesso', 'OK!');
  }

  marcarConsulta(){
    debugger
    const pacienteId = this.idDecodificado();
    const horario = this.form.get('horario')?.value;
    const dia = this.form.get('dia')?.value;
    const tipo = this.form.get('tipo')?.value;
    const medicoId = this.form.get('medicoId')?.value;

    this.formatoData = moment(this.form.get('dia')?.value).utc().startOf('day').toISOString();
    
    console.log('selectedMatDate:', this.selectedMatDate);
    this.authLogin.iniciarConsulta(pacienteId, tipo, horario, this.formatoData, medicoId).subscribe(() => {
      this.closeModal();
      this.sucesso();
      this.loadHorariosDisponiveis();
    })
  }


  
  

  loadHorariosDisponiveis() {
    const formatoData = this.form.get('dia')?.value.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    this.authLogin.getHorariosIndisponiveis(formatoData).subscribe((indisponiveis: string[]) => {
        this.horarios = this.horarios.map(horario => ({
            ...horario,
            disabled: indisponiveis.includes(horario.value)
        }));
    });
}

}




