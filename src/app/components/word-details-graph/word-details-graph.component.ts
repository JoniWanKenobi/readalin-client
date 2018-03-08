import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-word-details-graph',
  templateUrl: './word-details-graph.component.html',
  styleUrls: ['./word-details-graph.component.css']
})
export class WordDetailsGraphComponent implements OnInit {
  @Input() node: any;

  constructor() { }

  ngOnInit() {
  }

}
