import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalsituationsComponent } from './externalsituations.component';

describe('ExternalsituationsComponent', () => {
  let component: ExternalsituationsComponent;
  let fixture: ComponentFixture<ExternalsituationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalsituationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalsituationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
