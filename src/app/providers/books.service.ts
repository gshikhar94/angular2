import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { book } from "../book";
import { Observable } from "rxjs/Observable";
import { $ } from 'protractor';
import { Users } from "../Users";
import { AuthService } from "../providers/auth.service";

@Injectable()
export class BooksService {
  book: book;
  item: Observable<book>;
  constructor(public af: AngularFireAuth, public database: AngularFireDatabase,public authService:AuthService) {

  }

  getBooksDetail() {
    return this.database.list<book>('/Books').valueChanges();
  }
  issueBook(id: number) {
    let item = this.database.list<book>('/Books/', ref => ref.orderByChild('id').equalTo(id)).valueChanges();
    item.forEach(value => {
      value.filter((val, index, arr) => {
        this.database.object<book>('/Books/' + id).
          update({
            issued: val.issued + 1,
          })
      })
    });
    console.log(this.database.list<Users>('/Users/').query.ref.key);
  }

  likeBook(id: number) {
    let book = this.database.list<book>('/Books/'+id).valueChanges();
    book.forEach(books => {
      books.filter(book => {
        this.database.object<book>('/Books/' + id).
          update({
            likes: book.likes + 1,
          })
      })
    });
    console.log(this.authService.af.auth.currentUser.uid);
  }
  pushUserRecord(){
    console.log(this.authService.af.auth.currentUser.uid);
  }
}