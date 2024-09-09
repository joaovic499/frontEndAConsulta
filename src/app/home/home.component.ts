
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { AuthLoginService } from '../auth-login.service';
import { TipoUsuario } from '../login/tipoUsuario';
import { jwtDecode } from 'jwt-decode';

interface Consulta {
  tipo: string;
  horario: string;
  dia: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthLoginService, private authLogin: AuthLoginService, private cookieService: CookieService) {
    this.token = cookieService.get('token') || '';
  }

  private role: TipoUsuario | undefined;
  token: string;

  nome: string | null = null;

  consultas: Consulta[] = [];


  ngOnInit(): void {

    const roleStr = this.cookieService.get('role')
    if(roleStr === 'ADMIN') {
      this.role = TipoUsuario.ADMIN
    } else {
      this.role = TipoUsuario.USER
    }

    this.nome = this.nomeDecodificado();

    this.loadConsultas();
  }

  isAdmin(): boolean {
    return this.role === TipoUsuario.ADMIN;
  }

  isUsuario(): boolean {
    return this.role === TipoUsuario.USER
  }

  nomeDecodificado(): string | null{
    const token = this.cookieService.get('token')
    if(!token) {
      return null;
    }

    const decoded: any = jwtDecode(token)
    return decoded.name
  }

  idDecodificado(){
    const token = this.cookieService.get('token')
    if(!token) {
      return null;
    }

    const decoded: any = jwtDecode(token)
    return decoded.id
  }



  loadConsultas(): void {
    const pacienteId = this.idDecodificado();
    console.log(pacienteId)
      if (pacienteId) {
        this.authLogin.getConsultas(pacienteId).subscribe((consultas: Consulta[]) => {
          console.log('Consultas recebidas:', consultas);
          this.consultas = consultas;
        })
      }
    }
  }
