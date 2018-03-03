import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() book: any;
 

  constructor(private router: Router, private booksService: BooksService) { }

  ngOnInit() {
  }

  goToBookPage(bookId){
    
    this.router.navigate(['/book', bookId]);
  }

}
