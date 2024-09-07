import { Component, Input } from '@angular/core';

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [
  {
    type: 'success',
    message: 'Login feito com sucesso!',
  },
]

@Component({
  selector: 'app-login-sucess',
  templateUrl: './login-sucess.component.html',
  styleUrl: './login-sucess.component.css'
})

export class LoginSucessComponent {
  @Input() loginAlert: Alert[] = [];

  constructor() {
    this.reset();
  }

  close(alert: Alert) {
    this.loginAlert.splice(this.loginAlert.indexOf(alert), 1);
  }

  reset() {
    this.loginAlert = Array.from(ALERTS)
  }
}
