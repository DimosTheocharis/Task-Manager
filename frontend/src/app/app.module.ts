import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from 'src/app/Screens/home/home.component';
import { LoginComponent } from 'src/app/Screens/login/login.component';
import { RegisterComponent } from 'src/app/Screens/register/register.component';
import { TodoComponent } from 'src/app/Components/todo/todo.component';
import { ProgressBarComponent } from './Components/progress-bar/progress-bar.component';
import { jwtInterceptorProvider } from './Interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    TodoComponent,
    ProgressBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
      progressAnimation: "increasing",
      timeOut: 700
    }),
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [jwtInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
