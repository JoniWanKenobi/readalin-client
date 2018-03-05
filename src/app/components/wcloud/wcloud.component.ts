import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as d3 from 'd3'; this //doesn't work because D3>4, should downgrade it

import { BooksService } from '../../services/books.service';

import * as cloud from 'd3-cloud';



@Component({
  selector: 'app-wcloud',
  templateUrl: './wcloud.component.html',
  styleUrls: ['./wcloud.component.css']
})
export class WcloudComponent implements OnInit {
  

  @Input() filterParameters: any;
  
  entities: any;
  layout: any;
  words: any;
  width: number;
  height: number;
  // fontScale: any;
  loading = true;

  
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

    this.entities = book.data.entities.slice(0, 200); //get entities from the books service
    this.entities = this.filterEntities(this.filterParameters, this.entities); // filter the entities by category

    const fill = d3.scale.category20(); 
       
    console.log(this.entities);
    this.width = 700;
    this.height = 500;  
    const fontScale = d3.scale.linear().range([10, 40]);
    fontScale.domain([
      d3.min(this.entities, (d=>d.salience)),
      d3.min(this.entities, (d=>d.salience)),
    ])
    this.layout = cloud()
        .size([1500, 1500])
        .words(this.entities.map(function(d) {
          return {text: d.name, size: 10 + d.salience * 4000, score: d.sentiment.score, test: "haha"};
        }))
        .padding(0)
        .font("Impact")
        .fontSize(function(d) { return d.size; })
        .on("end", this.draw);
  
    this.layout.start();
  }
    
  ngAfterViewInit(){
    console.log('view init');
      // document.body.querySelector('svg').remove();
  }

  draw(words) {
    const self = this;
    const width = this.width;
    const height = this.height;
    d3.select("#wordcloud").append("svg")
    .style("width", '100vw')
    .style("height", '250vh')
    .attr("class", "drawing")
    .append("g")
    .attr("transform", "translate(" + (1300 / 2) + "," + (1150 / 2) + ")")
    .selectAll("text")
    .data(words)
    .enter().append("text")
    .style("font-size", function(d) { return d.size + "px"; })
    .style("font-family", "BlinkMacSystemFont")
    .style("fill", ((d)=>{
      if(d.score > 0) { return 'green' }
      else if(d.score < 0){ return 'red' }
      else { return 'blue' };
    }))
    .attr("text-anchor", "middle")
    .attr("transform", function(d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function(d) { return d.text; });
    this.loading = false;
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