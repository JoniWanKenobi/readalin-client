import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sentences-list',
  templateUrl: './sentences-list.component.html',
  styleUrls: ['./sentences-list.component.css']
})
export class SentencesListComponent implements OnInit {
  @Input() sentences: any;
  constructor() { }

  ngOnInit() {
  }

}
