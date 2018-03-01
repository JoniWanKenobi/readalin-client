import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: any;
  filteredBooks: Object[];
  searched: string = '';
  user: Object;
  loading: boolean = true;

  constructor(private authService: AuthService,
              private router: Router,
              private booksService: BooksService) { }

  ngOnInit() {

    this.booksService.booksChange$.subscribe((books) => {
      this.loading = false;
      this.books = books;
    });

    this.user = this.authService.getUser();
    this.books = this.booksService.getBooks();

    
    this.filteredBooks = this.books;
  }

  logout(){
    this.authService.logout()
      .then(() => this.router.navigate(['home']))
  }

  filterBooks(term){
    if(term.length < 0){
      this.filteredBooks = this.books;
    } else {
      this.filteredBooks = this.books.filter((book) => {
        return book.title.includes(term) || book.author.includes(term); 
      });
    }
  }

}
