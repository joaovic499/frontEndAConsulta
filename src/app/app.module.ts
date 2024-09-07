import { MatSelectModule } from '@angular/material/select';

import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { MatIconModule } from '@angular/material/icon'; // Adicionei a vírgula aqui
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MenuComponent } from './home/menu/menu.component';
import { MenuAdminComponent } from './home-admin/menu-admin/menu-admin.component';
import { ModalComponent } from './home-admin/modal/modal.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ModalUserComponent } from './home/modal-user/modal-user.component'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/Interceptor';
import { CookieService } from 'ngx-cookie-service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginSucessComponent } from './alerts/login-sucess/login-sucess.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    HomeAdminComponent,
    MenuComponent,
    MenuAdminComponent,
    ModalComponent,
    ModalUserComponent,
    LoginSucessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatSelectModule,
    MatSnackBarModule



  ],
  providers: [
    CookieService,
    provideClientHydration(),
    provideAnimationsAsync(),
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
