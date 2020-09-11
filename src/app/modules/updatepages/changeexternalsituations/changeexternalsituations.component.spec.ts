import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeexternalsituationsComponent } from './changeexternalsituations.component';

describe('ChangeexternalsituationsComponent', () => {
  let component: ChangeexternalsituationsComponent;
  let fixture: ComponentFixture<ChangeexternalsituationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeexternalsituationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeexternalsituationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
