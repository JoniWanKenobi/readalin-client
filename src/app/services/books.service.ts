import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';


import { environment } from '../../environments/environment';

@Injectable()
export class BooksService {

  
  private booksChange: Subject<any> = new Subject();

  private API_URL = environment.apiUrl + '/books';

  booksChange$: Observable<any> = this.booksChange.asObservable();

  books: Object[];
  book: Object;

  

  constructor(private httpClient: HttpClient) { 
    

  }

  private setBooks(books?: any) {
    this.books = books;
    this.booksChange.next(books);
    return books;
  }

  getRemoteBooks(userId): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.API_URL}/all/${userId}`, options)
      .toPromise()
      .then((books) => this.setBooks(books))
      .catch((err) => {
        if (err.status === 404) {
          this.setBooks();
        }
      });
  }

  postBook(userId, book){
    const options = {
      withCredentials: true
    }

    return this.httpClient.post(`${this.API_URL}/book/${userId}`, book, options)
      .toPromise()
  }
    
  getBooks(){
    return this.books;
  }

  getOneBook(bookId): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.API_URL}/book/${bookId}`, options)
      .toPromise()
      .then((book) => this.setBook(book))
      .catch((err) => {
        if (err.status === 404) {
          this.setBook();
        }
      });
  }

  private setBook(book?: any) {
    this.book = book;    
    return book;
  }

  


    
  }
  
  