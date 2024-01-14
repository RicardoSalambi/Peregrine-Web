import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangememberinformationComponent } from './changememberinformation.component';

describe('ChangememberinformationComponent', () => {
  let component: ChangememberinformationComponent;
  let fixture: ComponentFixture<ChangememberinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangememberinformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangememberinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
