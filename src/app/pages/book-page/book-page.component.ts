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

  wordDetails: boolean = false;
  selectedNode: any;
  wordsNodes: any;
  wordsLinks: any;

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
    this.selectedLevel = Number(level);
    console.log('selected level: ', this.selectedLevel);
    this.setEntities();
    this.showWordCloud = false;
    window.setTimeout(() => this.showWordCloud=true);
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
    const slicedEntities = this.entities.slice((this.selectedLevel -1) * this.interval, this.selectedLevel * this.interval);
    this.types = this.getTypes(slicedEntities);
    this.filteredEntities = this.filterEntities(this.selectedType, slicedEntities);    
    this.entitiesNodes = this.makeNodes(this.filteredEntities);    
    this.entitiesLinks = this.makeLinks(this.filteredEntities);    
  }

  makeNodes(entitiesArr){
    return entitiesArr.map((entity: any, index: number) => {
      return { 
        id: index, 
        name: entity.name, 
        level: 1, 
        color: entity.sentiment.score, 
        size: entity.salience * 90,
        metadata: entity.metadata,
        mentions: this.reduceMentions(entity)
      }
    });
  }

  getAllSentences(reducedMentions){
    const res = [];
    reducedMentions.forEach((mention) => {
      res.push(this.getSentences(mention));
    })
    return res;
  }

  reduceMentions(entity){
    return entity.mentions.reduce((acc, val) => {
      if(acc.indexOf(val.text.content) > -1){
        acc.push(val.text.content);
      }
      return acc;
    }, [entity.name]);
  }

  getSentences(mention){
    return this.book.data.sentences.reduce((acc, val) => {
      if(val.text.content.includes(mention)){
        acc.push(val.text.content)
      }
      return acc;
    }, []);    
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

  entityClickEvent(node: any){
    this.selectedNode = node;
    this.wordsNodes = this.mapWordsNodes(node);
    this.wordsLinks = this.mapWordsLinks(this.wordsNodes);
    this.showWordCloud = false;
    this.wordDetails = true;    
  }

  mapWordsNodes(node: any){
    const sentences = this.getAllSentences(node.mentions);
    return sentences.map((sentence: any, index: number) => {
      return { 
        id: index, 
        name: sentence, 
        level: 1, 
        color: node.color, 
        size: 30
      }
    });    
  }

  mapWordsLinks(nodes){    
    return nodes.map((sentence: any, index: number) => {
      return { 
        target: 0, 
        source: index , 
        strength: 0.05 }
    });
  }

  sentencesClickEvent(node: any){
    // this.selectedNode = node;
    // this.wordsNodes = this.mapWordsNodes(node);
    // this.wordsLinks = this.mapWordsLinks(this.wordsNodes);
    this.showWordCloud = true;
    this.wordDetails = false;    
  }
}