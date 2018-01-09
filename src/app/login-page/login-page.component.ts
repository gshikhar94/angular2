import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { AngularFireDatabase } from "angularfire2/database";
import { Users } from "../Users";
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  users: Array<Users>;

  constructor(public authService: AuthService, private router: Router, public angularFireDatabase: AngularFireDatabase) { }
  ngOnInit() {
  }
  loginWithGoogle() {
    this.authService.loginWithGoogle().then((data) => {
      this.router.navigate(['']);
    })
  }

  login(email: string, password: string) {
    this.angularFireDatabase.list('/Users', ref => ref.orderByChild('userName').equalTo(email)).valueChanges().subscribe(data => console.log(data));
  }
}
