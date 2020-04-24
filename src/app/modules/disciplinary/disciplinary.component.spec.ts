import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinaryComponent } from './disciplinary.component';

describe('DisciplinaryComponent', () => {
  let component: DisciplinaryComponent;
  let fixture: ComponentFixture<DisciplinaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplinaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
