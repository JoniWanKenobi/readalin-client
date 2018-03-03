import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WcloudComponent } from './wcloud.component';

describe('WcloudComponent', () => {
  let component: WcloudComponent;
  let fixture: ComponentFixture<WcloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WcloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WcloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
