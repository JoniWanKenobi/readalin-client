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

    this.books = [
      {
        title: 'The hedonistic imperative',
        author: 'David Pierce'
      },
      {
        title: 'The evolution of human feelings',
        author: 'Jonathan Mills'
      },
      {
        title: 'All you need to know about numbers',
        author: 'Francis Bacon'
      },
      {
        title: 'Javascript for dummies',
        author: 'Andre Torval'
      },
      {
        title: 'The bilble',
        author: 'God'
      }
    ]

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
    return this.httpClient.get(`${this.API_URL}/books`, options)
      .toPromise()
      .then((books) => this.setBooks(books))
      .catch((err) => {
        if (err.status === 404) {
          this.setBooks();
        }
      });
  }

  getBooks(){
    return this.books;
  }

}
