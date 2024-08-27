import { CookieService } from 'ngx-cookie-service';
import { CanActivateFn } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { AuthLoginService } from '../auth-login.service';
import { Router } from '@angular/router';

export const GuardsAuthService: CanActivateFn = (route, state) => {
  const authService = inject(AuthLoginService)
  const router = inject(Router)
  const cookieService = inject(CookieService);

  if(authService.tokenValid()) {
    const token = cookieService.get('token');
    const userRole = authService.getUserRole(token);

    if(route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
      authService.logoutAuth();
      return false;
    }

    return true;

  } else {
    authService.logouAuthExpired();
    return false;
  }
};
