import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { book } from "../book";
import { Observable } from "rxjs/Observable";
import { $ } from 'protractor';

@Injectable()
export class BooksService {
  book: book;
  item: Observable<book>;
  constructor(public af: AngularFireAuth, public database: AngularFireDatabase) {

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
  }
}