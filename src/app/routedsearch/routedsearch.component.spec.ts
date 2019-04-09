import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutedsearchComponent } from './routedsearch.component';

describe('RoutedsearchComponent', () => {
  let component: RoutedsearchComponent;
  let fixture: ComponentFixture<RoutedsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutedsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutedsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
