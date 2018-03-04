import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {

  user: any;
  book: Object;
  bookId: any;
  loading: boolean = true;
  entities: Object[];
  types: Array<string>;
  tagClass: string = "tag";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private booksService: BooksService
    ) { }

  ngOnInit() {

    this.route.params
      .subscribe((params) => this.bookId = params['id']);

    this.user = this.authService.getUser();

    this.booksService.getOneBook(this.bookId)
      .then((book) => {
        this.loading = false;
        this.book = book;
        this.entities = this.book.data.entities;
        this.types = this.getTypes(this.entities);
      });
    
  }

  goToBooks(userId){
    this.router.navigate(['books', this.user._id])
  }

  

  getTypes(entities: Object[]){    
    return entities.reduce((acc, val) => {
      if(acc.indexOf(val.type) === -1){
        acc.push(val.type);
      }
      return acc;
    }, []);   
  }

  tagClicked(){
    if(this.tagClass === "tag is-danger"){
      this.tagClass = "tag"
    } else {
      this.tagClass = "tag is-danger"
    }
  }


}
