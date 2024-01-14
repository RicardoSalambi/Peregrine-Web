import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkleaveComponent } from './workleave.component';

describe('WorkleaveComponent', () => {
  let component: WorkleaveComponent;
  let fixture: ComponentFixture<WorkleaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkleaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
