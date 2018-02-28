import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageRightComponent } from './homepage-right.component';

describe('HomepageRightComponent', () => {
  let component: HomepageRightComponent;
  let fixture: ComponentFixture<HomepageRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
