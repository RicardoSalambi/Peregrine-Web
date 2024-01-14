import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangedependanciesComponent } from './changedependancies.component';

describe('ChangedependanciesComponent', () => {
  let component: ChangedependanciesComponent;
  let fixture: ComponentFixture<ChangedependanciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangedependanciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangedependanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
