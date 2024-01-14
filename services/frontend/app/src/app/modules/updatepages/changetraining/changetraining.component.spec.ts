import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangetrainingComponent } from './changetraining.component';

describe('ChangetrainingComponent', () => {
  let component: ChangetrainingComponent;
  let fixture: ComponentFixture<ChangetrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangetrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangetrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
