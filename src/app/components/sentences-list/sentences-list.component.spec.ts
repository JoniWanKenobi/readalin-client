import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentencesListComponent } from './sentences-list.component';

describe('SentencesListComponent', () => {
  let component: SentencesListComponent;
  let fixture: ComponentFixture<SentencesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentencesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentencesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
