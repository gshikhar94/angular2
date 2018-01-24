import { Component, OnInit, Input } from '@angular/core';
import { book } from "../book";
import { BooksService } from "../providers/books.service";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from "angularfire2/database";
import * as lodash from 'lodash';
import { Subject } from "rxjs/Subject";
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { AuthService } from "../providers/auth.service";
import { Users } from '../Users';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-books-detail',
  templateUrl: './books-detail.component.html',
  styleUrls: ['./books-detail.component.css']
})
export class BooksDetailComponent implements OnInit {
  books: Observable<book[]>;
  items: any;
  formControl = new FormControl();
  categories=['Technical','Fiction','Non-Fiction'];

  constructor(public booksService: BooksService, public database: AngularFireDatabase, public authService: AuthService) { }
  filteredBooks: Observable<book[]>;
  category: string;
  totalCopies: number;
  searchValue: string;
  name: any;

  ngOnInit() {
    this.getBooks();
    this.database.list('/Books').valueChanges().subscribe(books => {
      books;
    })
  }

  removeFilter(property: string) {
    this.filteredBooks = this.getBooks();
  }
  getBooks(): Observable<book[]> {
    this.books = this.booksService.getBooksDetail();
    return this.books;
  }

  filterSearch(searchString: string, property: string) {
    console.log(searchString);
    this.filteredBooks = this.searchSomething(searchString, property);
  }

  searchSomething(searchString: string, property: string) {
    return this.getBooks()
      .map(books =>
        books.filter(book =>
          book[property].toLowerCase().indexOf(searchString.toLowerCase()) >= 0
        )
      );
  }
  likes(id: number) {
    this.booksService.likeBook(id);
  }

}
