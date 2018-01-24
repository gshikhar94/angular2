import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { BooksService } from "../providers/books.service";
@Component({
  selector: 'app-book-issuing',
  templateUrl: './book-issuing.component.html',
  styleUrls: ['./book-issuing.component.css']
})
export class BookIssuingComponent implements OnInit {

  constructor(public router: ActivatedRoute, public bookService: BooksService) { }

  ngOnInit() {
    this.issueBook();
  }

  issueBook() {
    let id: number;
    this.router.params.subscribe(params => {
      id = +params["id"];
      console.log("Book selected with id" + id);
      this.bookService.issueBook(id);
    })
    
  }
}
