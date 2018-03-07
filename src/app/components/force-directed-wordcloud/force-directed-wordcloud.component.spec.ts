import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceDirectedWordcloudComponent } from './force-directed-wordcloud.component';

describe('ForceDirectedWordcloudComponent', () => {
  let component: ForceDirectedWordcloudComponent;
  let fixture: ComponentFixture<ForceDirectedWordcloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForceDirectedWordcloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForceDirectedWordcloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
