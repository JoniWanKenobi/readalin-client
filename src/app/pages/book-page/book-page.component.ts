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
  book: any;
  bookId: any;
  loading: boolean = true;
  entities: Object[];
  types: any;
  tagClass: string = "tag can-click";

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
      .then((book: any) => {
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
    return entities.reduce((acc: Array<any>, val: any) => {
      if(acc.indexOf(val.type) === -1){
        acc.push(val.type);
      }
      return acc;
    }, ['ALL']);   
  }

  tagClicked(){
    if(this.tagClass === "tag is-danger"){
      this.tagClass = "tag can-click"
    } else {
      this.tagClass = "tag can-click is-danger"
    }
  }

  filterWordCloud(cat){    
    
    this.router.navigate(['flyover'], { relativeTo: this.route, queryParams: { filter: [cat] }});
  }

}