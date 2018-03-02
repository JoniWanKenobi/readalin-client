import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BooksService {

  
  private booksChange: Subject<any> = new Subject();

  private API_URL = 'http://localhost:3000/books';

  booksChange$: Observable<any> = this.booksChange.asObservable();

  books: Object[];

  constructor(private httpClient: HttpClient) { 
    

  }

  private setBooks(books?: any) {
    this.books = books;
    this.booksChange.next(books);
    return books;
  }

  getRemoteBooks(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.API_URL}`, options)
      .toPromise()
      .then((books) => this.setBooks(books))
      .catch((err) => {
        if (err.status === 404) {
          this.setBooks();
        }
      });
  }

  postBook(book){
    const options = {
      withCredentials: true
    }

    return this.httpClient.post(`${this.API_URL}`, book, options)
      .toPromise()
  }
    
    getBooks(){
      return this.books;
    }
    
  }
  
  // .then(()=>this.getRemoteBooks());