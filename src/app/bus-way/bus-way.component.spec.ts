import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusWayComponent } from './bus-way.component';

describe('BusWayComponent', () => {
  let component: BusWayComponent;
  let fixture: ComponentFixture<BusWayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusWayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusWayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
