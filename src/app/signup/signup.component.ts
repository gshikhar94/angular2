import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import * as firebase from 'firebase';
import { querybase } from "querybase";
import { } from "module";
import { AngularFireDatabase } from "angularfire2/database";
import { Users } from "../Users";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  items: any;
  users: Array<Users>;
  constructor(public af: AuthService, public router: Router, public authDatabase: AngularFireDatabase) {
    this.users = [];
  }

  ngOnInit() {
  }

  signup(phone: string, dob: string, email: string, password: string) {
    // this.users.Phone = phone;
    let user = new Users(phone, dob, email, password);
    this.users.push(user);

    //This code is to get the data from the firebase database
    // this.items = this.authDatabase.list('/Users').valueChanges().subscribe(items => {
    //   console.log(items);
    // });
    console.log(this.users.forEach((values) => { console.log(values) }));

    //This code is to push the object into the database
    var ref = this.authDatabase.list('/Users').push(user);
    if (ref) {
      console.log("Data has been added successfully" + ref.key);
      ref.update({
        id: ref.key
      })
    }

  }
}
