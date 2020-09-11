import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertdetailsComponent } from './insertdetails.component';

describe('InsertdetailsComponent', () => {
  let component: InsertdetailsComponent;
  let fixture: ComponentFixture<InsertdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
