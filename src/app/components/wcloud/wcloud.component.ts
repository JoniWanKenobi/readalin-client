import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as d3 from 'd3'; 

import { BooksService } from '../../services/books.service';



@Component({
  selector: 'app-wcloud',
  templateUrl: './wcloud.component.html',
  styleUrls: ['./wcloud.component.css']
})
export class WcloudComponent implements OnInit {
  @Input() filterParameters: any;  

  entities: any;
  entitiesNodes: any;
  entitiesLinks: any;
  // loading = true;

  
  constructor(private booksService: BooksService, 
              private route: ActivatedRoute, 
              private router: Router) { 
              
              }
  
  ngOnInit() {
    
    
    this.route.queryParams //grab the filters parameters in the url
      .subscribe((queryParams) => {
        this.filterParameters = queryParams['filter'];
    });

    const book: any = this.booksService.book;

    this.entities = book.data.entities.slice(0, 50); //get entities from the books service
    
    // this.entities = this.filterEntities(this.filterParameters, this.entities); // filter the entities by category
       
    this.entitiesNodes = this.makeNodes(this.entities);
    console.log('nodes: ', this.entitiesNodes);
    this.entitiesLinks = this.makeLinks(this.entities);
    console.log('links: ', this.entitiesLinks);
    
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



  filterEntities(filterArr: Array<string>, arrToBeFiltered: Object[]): Object[]{
  
    if(filterArr){
      return arrToBeFiltered.filter((obj: any) => {
        return filterArr.indexOf(obj.type) >= 0;
      });
    } else {
      return arrToBeFiltered;
    }
  }

}