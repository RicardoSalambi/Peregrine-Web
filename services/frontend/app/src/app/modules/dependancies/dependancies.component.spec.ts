import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependanciesComponent } from './dependancies.component';

describe('DependanciesComponent', () => {
  let component: DependanciesComponent;
  let fixture: ComponentFixture<DependanciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependanciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
