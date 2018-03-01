import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() user: Object;

  @Output() doLogout = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  logout(){
    this.doLogout.emit();
  }

}
