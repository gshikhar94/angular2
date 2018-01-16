import { Component, OnInit, Input } from '@angular/core';
import { book } from "../book";
import { BooksService } from "../providers/books.service";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from "angularfire2/database";
import * as lodash from 'lodash';
import { Subject } from "rxjs/Subject";
@Component({
  selector: 'app-books-detail',
  templateUrl: './books-detail.component.html',
  styleUrls: ['./books-detail.component.css']
})
export class BooksDetailComponent implements OnInit {
  books: Observable<book[]>;
  items: any;
  constructor(public booksService: BooksService, public database: AngularFireDatabase) { }
  filteredBooks: any;
  /// filter-able properties
  category: string;
  totalCopies: number;
  endangered: boolean;
  searchValue: string;




  /// Active filter rules
  filters = {}

  ngOnInit() {
    // this.getBooks();
    this.database.list('/Books').valueChanges().subscribe(books => {
      this.items = books;
      this.applyFilters();
    })
  }


  private applyFilters() {
    this.filteredBooks = lodash.filter(this.items, lodash.conforms(this.filters))
  }
  /// filter property by equality to rule
  filterExact(property: string, rule: any) {
    this.filters[property] = val => val == rule
    this.applyFilters()
  }
  /// filter  numbers greater than rule
  filterGreaterThan(property: string, rule: number) {
    this.filters[property] = val => val > rule
    this.applyFilters()
  }
  /// filter properties that resolve to true
  // filterBoolean(property: string, rule: boolean) {
  //   if (!rule) this.removeFilter(property)
  //   else {
  //     this.filters[property] = val => val
  //     this.applyFilters()
  //   }
  // }
  /// removes filter
  removeFilter(property: string) {
    delete this.filters[property]
    this[property] = null
    this.applyFilters()
  }
  getBooks(): Observable<book[]> {
    this.books = this.booksService.getBooksDetail();
    return this.books;
  }

  filterSearch(searchString: string) {
    console.log(searchString);
    this.filteredBooks = this.getBooks().map(books => 
      books.filter(book => 
        book['name'].toLowerCase().indexOf(searchString.toLowerCase())));

  }
}
