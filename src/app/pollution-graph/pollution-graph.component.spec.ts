import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollutionGraphComponent } from './pollution-graph.component';

describe('PollutionGraphComponent', () => {
  let component: PollutionGraphComponent;
  let fixture: ComponentFixture<PollutionGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollutionGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollutionGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
