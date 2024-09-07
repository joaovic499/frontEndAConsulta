import { Router } from '@angular/router';
import { TipoUsuario } from './login/tipoUsuario';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Consulta {
  tipo: string;
  horario: string;
  dia: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  public _snackBar = inject(MatSnackBar)

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  public role: | undefined;
  private tipoUsuario: TipoUsuario | undefined;

  ngOnInit(): void {
    const role = this.cookieService.get('role')
      if(role === 'ADMIN') {
        this.tipoUsuario = TipoUsuario.ADMIN
      } else {
        this.tipoUsuario = TipoUsuario.USER
      }
  }

  login(email: string, password: string): Observable<boolean>{
    debugger;
    return this.http.post<any>("http://localhost:3000/auth/login", {email, password}, {observe: 'response'})
      .pipe(tap(
        (res: any) => {
          if(res.body && res.body.token) {
            const token = res.body.token;
            this.cookieService.set('token', token);
            const role = this.getUserRole(token);
            this.cookieService.set('role', role)

              if(role === 'ADMIN') {
                this.tipoUsuario = TipoUsuario.ADMIN
              } else {
                this.tipoUsuario = TipoUsuario.USER
              }

              console.log(`Usuário autenticado ´pr ${token}`)

          } else {
              console.error('Resposta do login mal informada', res);
          }
        }
      ))
  }

  iniciarConsulta(pacienteId: string, tipo: String, horario: String, dia: Date, medicoId: string): Observable<any>{
    return this.http.post<any>('http://localhost:3000/auth/register/consulta', {pacienteId, tipo, horario, dia, medicoId})
  }

  getHorariosIndisponiveis(data: string): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:3000/auth/horarios/${data}`);
  }

  getConsultas(idPaciente: string): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`http://localhost:3000/auth/consulta/${idPaciente}`)
  }


  getRole() {
    return this.cookieService.get('role');
  }

  getToken() {
    return this.cookieService.get('token');
  }

  getUserRole(token: string) {
    const decoded: any = jwtDecode(token);
    return decoded.role;
  }


  logoutAuth(){
    this.cookieService.delete('token')
    this.cookieService.delete('role')
    window.alert('Rota restrita')
    this.router.navigate(['login'])
  }


  logouAuthExpired(){
    this.cookieService.delete('token')
    this.cookieService.delete('role')
    alert('Sessão expirada')
    this.router.navigate(['login'])
  }

  isAdmin(): boolean {
    return this.role == TipoUsuario.ADMIN;
  }

  isUsuario(): boolean {
    return this.role === TipoUsuario.USER
  }

  tokenValid(): boolean {
    const token = this.cookieService.get('token');

    if (!token) {
      return false;
    } else {
      return true;
    }
  }

  messageSucess(mensagem: "Consulta marcada com sucesso", acao: "OK!") {
    this._snackBar.open(mensagem, acao)
  }
}


