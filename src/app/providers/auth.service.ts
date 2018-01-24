import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase';
import { Users } from "../Users";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from "angularfire2/database";
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  authState: any = null;
  constructor(public af: AngularFireAuth, public database: AngularFireDatabase,public router:Router) {
    af.authState.subscribe(auth => this.authState = auth);
  }

  loginWithGoogle() {
    return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.af.auth.signOut();
      this.router.navigate(['/login']);
  }
  getAuthenticated(): boolean {
    return this.authState !== null;
  }
  getCurrentUser(): any {
    return this.getAuthenticated() ? this.authState : null;
  }
  getCurrentUserId(): any {
    return this.getAuthenticated() ? this.authState.uid : null;
  }
  getPhotoUrl(): any {
    return this.getAuthenticated() ? this.authState.photoURL : null;
  }
  getName(): any {
    return this.getAuthenticated() ? this.authState.displayName : null;
  }
  getEmail(): any {
    return this.getAuthenticated() ? this.authState.email : null;
  }
  getPhone(): any {
    return this.getAuthenticated() ? this.authState.phoneNumber : null;
  }
  getCurrentUserObservable():any{
    return this.af.authState;
  }
  saveCurrentUser() {
    console.log("hi");
    let email = this.getEmail();
    let name = this.getName();
    let uid = this.getCurrentUserId();
    let photoUrl = this.getPhotoUrl();
    let phone = this.getPhone();
    console.log(uid);
    let user = new Users(phone,null,name,null,uid,email,photoUrl);
    this.database.database.ref('/Users').child(uid).set(user);
  }
}
