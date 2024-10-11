import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForScheduleComponent } from './for-schedule.component';

describe('ForScheduleComponent', () => {
  let component: ForScheduleComponent;
  let fixture: ComponentFixture<ForScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForScheduleComponent]
    });
    fixture = TestBed.createComponent(ForScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
