import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
// import * as d3 from 'd3'; this doesn't work because D3>4, should downgrade it
import * as cloud from 'd3-cloud';

// import { cloud } from 'd3-cloud';

// import * as canvas from 'canvas';

@Component({
  selector: 'app-wcloud',
  templateUrl: './wcloud.component.html',
  styleUrls: ['./wcloud.component.css']
})
export class WcloudComponent implements OnInit {
  @Input() entities: Object[];
  
  layout: any;
  words: Array<any>;
  width: number;
  height: number;
  // fontScale: any;


  constructor() { }

  ngOnInit() {
    const fill = d3.scale.category20(); 
    this.words = [
      "Hello", "world", "normally", "you", "want", "more", "words",
      "than", "this"];   
      console.log(this.entities);
    this.width = 700;
    this.height = 500;  
    }
    
  ngAfterViewInit(){
      // document.body.querySelector('svg').remove();
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
        // .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .font("Impact")
        .fontSize(function(d) { return d.size; })
        .on("end", this.draw);

    this.layout.start();
  }


  draw(words) {
    const width = this.width;
    const height = this.height;
    d3.select("#wordcloud").append("svg")
        .style("width", '100vw')
        .style("height", '200vh')
      .append("g")
        .attr("transform", "translate(" + (1300 / 2) + "," + (1400 / 2) + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
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
  }

}
