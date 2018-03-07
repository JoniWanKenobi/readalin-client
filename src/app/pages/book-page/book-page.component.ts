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
  showWordCloud: boolean = true;
  tagClass: string = "tag can-click";
  levels: Array<number>;
  selectedLevel: number = 1;
  selectedType: string = 'ALL';


  interval: number = 50;
  filteredEntities: any;
  slicedEntities: any;
  entitiesNodes: any;
  entitiesLinks: any; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private booksService: BooksService,
    
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
      this.setEntities();   
    })
    
    this.levels = [1,2,3,4,5];
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

  setLevel(level){
    this.selectedLevel = level;
    this.setEntities();
  }

  setCategory(type){
    this.selectedType = type;
    this.setEntities();
    this.showWordCloud = false;
    window.setTimeout(() => this.showWordCloud=true);
  }

  tagClicked(){
    if(this.tagClass === "tag is-danger"){
      this.tagClass = "tag can-click"
    } else {
      this.tagClass = "tag can-click is-danger"
    }
  }



  setEntities(){
    this.slicedEntities = this.entities.slice((1 - this.selectedLevel) * this.interval, this.selectedLevel * this.interval);
    this.types = this.getTypes(this.slicedEntities);
    this.filteredEntities = this.filterEntities(this.selectedType, this.slicedEntities);    
    this.entitiesNodes = this.makeNodes(this.filteredEntities);    
    this.entitiesLinks = this.makeLinks(this.filteredEntities);
    
  }

  makeNodes(entitiesArr){
    return entitiesArr.map((entity: any, index: number) => {
      return { 
        id: index, 
        name: entity.name, 
        level: 1, 
        score: entity.sentiment.score, 
        salience: entity.salience * 90
      }
    });
  }

  makeLinks(entitiesArr){    
    return entitiesArr.map((entity: any, index: number) => {
      return { 
        target: 0, 
        source: index , 
        strength: 0.05 }
    });
  }

  filterEntities(category: string, entities: Object[]): Object[]{  
    if(category !== 'ALL'){
      return entities.filter((obj: any) => {
        return obj.type === category;
      });
    } else {
      return entities;
    }
  }

}