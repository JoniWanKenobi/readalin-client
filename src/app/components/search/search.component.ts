import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() searchingFor = new EventEmitter<string>(); 

  term: string = '';

  constructor() { }

  ngOnInit() {
  }

  search(){
    this.searchingFor.emit(this.term);
  }

}
