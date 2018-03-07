import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordDetailsGraphComponent } from './word-details-graph.component';

describe('WordDetailsGraphComponent', () => {
  let component: WordDetailsGraphComponent;
  let fixture: ComponentFixture<WordDetailsGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordDetailsGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordDetailsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
