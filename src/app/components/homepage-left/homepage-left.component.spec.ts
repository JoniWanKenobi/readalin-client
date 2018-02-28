import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageLeftComponent } from './homepage-left.component';

describe('HomepageLeftComponent', () => {
  let component: HomepageLeftComponent;
  let fixture: ComponentFixture<HomepageLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
