import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "angularfire2";
import { AuthService } from "./providers/auth.service";
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SignupComponent } from './signup/signup.component';
import { AngularFireDatabase } from "angularfire2/database";

export const firebaseConfig = {
  apiKey: "AIzaSyD_bAKxXvW5xwQPrfdNuhOmRcifaBVs9IQ",
  authDomain: "demoproject-5373d.firebaseapp.com",
  databaseURL: "https://demoproject-5373d.firebaseio.com",
  projectId: "demoproject-5373d",
  storageBucket: "demoproject-5373d.appspot.com",
  messagingSenderId: "1062001801091"
}
const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService,AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
