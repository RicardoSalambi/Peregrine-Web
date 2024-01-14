import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeworkleaveComponent } from './changeworkleave.component';

describe('ChangeworkleaveComponent', () => {
  let component: ChangeworkleaveComponent;
  let fixture: ComponentFixture<ChangeworkleaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeworkleaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeworkleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
