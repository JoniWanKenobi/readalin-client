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
    // let fileBrowser = this.fileInput.nativeElement;
    if(inputEl.files && inputEl.files[0]){
      const formData = new FormData();
      formData.append('uploadedFile', inputEl.files[0]);
      
      console.log('formData: ', );
      console.log('inputEl: ', inputEl);
      console.log('inputEl.files[0]: ', inputEl.files[0]);
      console.log('inputEl.files.item(0): ', inputEl.files.item(0))
      this.booksService.postBook(formData)
        .then(() => console.log('okeeey'))
    }
    // }
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
