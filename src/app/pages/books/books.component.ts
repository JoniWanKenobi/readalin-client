import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {
  @ViewChild('fileInput') fileInput; 

  books: Object[];
  filteredBooks: Object[];  
  user: Object;
  loading: boolean = true;

  constructor(private authService: AuthService,
              private router: Router,
              private booksService: BooksService) { }

  ngOnInit() {

    this.booksService.getRemoteBooks()
      .then((books) => {
        this.loading = false;
        this.books = books;
      })
      .then(() => this.filteredBooks = this.books);

    // this.booksService.booksChange$.subscribe((books) => {
    //       this.loading = false;
    //       this.books = books;
    //     })
    
    // this.booksService.getRemoteBooks()
    //     .then((books) => this.filteredBooks = books);

    this.user = this.authService.getUser();
    
  }

  upload(){
    let inputEl: HTMLInputElement = document.querySelector('#file-input');
    if(inputEl.files && inputEl.files[0]){
      const formData = new FormData();
      formData.append('uploadedFile', inputEl.files[0]);      
      this.booksService.postBook(formData)
        // .then((res) => console.log(res.text))
    }
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
        return book.originalName.includes(term) || this.isInCategories(book, term); 
      });
    }
  }

  isInCategories(book, term){
    let isInThere = false;
    book.data.categories.forEach((cat)=>{
      if(cat.includes(term)){
        isInThere = true;
      }
    });
    return isInThere;
  }

}