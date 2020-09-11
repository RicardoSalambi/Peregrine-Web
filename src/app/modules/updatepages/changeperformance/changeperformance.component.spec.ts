import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeperformanceComponent } from './changeperformance.component';

describe('ChangeperformanceComponent', () => {
  let component: ChangeperformanceComponent;
  let fixture: ComponentFixture<ChangeperformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeperformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeperformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
