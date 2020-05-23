import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangedisciplinaryComponent } from './changedisciplinary.component';

describe('ChangedisciplinaryComponent', () => {
  let component: ChangedisciplinaryComponent;
  let fixture: ComponentFixture<ChangedisciplinaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangedisciplinaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangedisciplinaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
