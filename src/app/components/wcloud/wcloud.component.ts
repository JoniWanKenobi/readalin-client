import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as cloud from 'd3-cloud';
// import { cloud } from 'd3-cloud';

// import * as canvas from 'canvas';

@Component({
  selector: 'app-wcloud',
  templateUrl: './wcloud.component.html',
  styleUrls: ['./wcloud.component.css']
})
export class WcloudComponent implements OnInit {
  fill: any;
  layout: any;


  constructor() { }

  ngOnInit() {
    this.fill = d3.scale.category20();    
  }
  
  ngAfterViewInit(){
    
    this.layout = cloud()
        .size([500, 500])
        .words([
          "Hello", "world", "normally", "you", "want", "more", "words",
          "than", "this"].map(function(d) {
          return {text: d, size: 10 + Math.random() * 90, test: "haha"};
        }))
        .padding(5)
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .font("Impact")
        .fontSize(function(d) { return d.size; })
        .on("end", this.draw);

    this.layout.start();
  }

  draw(words) {
    d3.select("body").append("svg")
        .attr("width", 500)
        .attr("height", 500)
      .append("g")
        .attr("transform", "translate(" + 500 / 2 + "," + 500 / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", 'red')
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
  }
}
