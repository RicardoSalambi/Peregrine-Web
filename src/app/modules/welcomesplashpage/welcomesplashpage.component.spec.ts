import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomesplashpageComponent } from './welcomesplashpage.component';

describe('WelcomesplashpageComponent', () => {
  let component: WelcomesplashpageComponent;
  let fixture: ComponentFixture<WelcomesplashpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomesplashpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomesplashpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
