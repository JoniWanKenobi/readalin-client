import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  userId: string;
  loading: boolean = true;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private booksService: BooksService) { }

  ngOnInit() {

    this.route.params
      .subscribe((params) => this.userId = params['id']);

    this.booksService.getRemoteBooks(this.userId)
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
    // let inputEl: HTMLInputElement = document.querySelector('#file-input');
    let inputEl: any = document.querySelector('#file-input');
    if(inputEl.files && inputEl.files[0]){
      const formData = new FormData();
      formData.append('uploadedFile', inputEl.files[0]);  
      console.log('user: ', this.user);    
      this.booksService.postBook(this.userId, formData)
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
      this.filteredBooks = this.books.filter((book: any) => {
        return book.originalName.toLowerCase().includes(term.toLowerCase()) || this.isInCategories(book, term); 
      });
    }
  }

  isInCategories(book, term){
    let isInThere = false;
    book.data.categories.forEach((cat)=>{
      if(cat.name.toLowerCase().includes(term.toLowerCase())){
        isInThere = true;
      }
    });
    return isInThere;
  }

}