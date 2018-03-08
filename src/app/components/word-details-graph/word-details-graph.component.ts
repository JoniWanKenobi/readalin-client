import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-word-details-graph',
  templateUrl: './word-details-graph.component.html',
  styleUrls: ['./word-details-graph.component.css']
})
export class WordDetailsGraphComponent implements OnInit {
  @Input() node: any;
  @Input() info: any;
  @Output() hideDetails = new EventEmitter<boolean>();

  showSentences: boolean = false;
  selectedWord: any;

  constructor() { }

  ngOnInit() {
  }

  back(){
    this.hideDetails.emit(false);
  }

  toggleShowSentences(item){
    this.showSentences = !this.showSentences;
    this.selectedWord = item;
  }

}
