import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectedGraphComponent } from './directed-graph.component';

describe('DirectedGraphComponent', () => {
  let component: DirectedGraphComponent;
  let fixture: ComponentFixture<DirectedGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectedGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectedGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
