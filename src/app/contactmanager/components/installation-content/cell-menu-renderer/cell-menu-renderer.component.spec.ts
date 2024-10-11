import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellMenuRendererComponent } from './cell-menu-renderer.component';

describe('CellMenuRendererComponent', () => {
  let component: CellMenuRendererComponent;
  let fixture: ComponentFixture<CellMenuRendererComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CellMenuRendererComponent]
    });
    fixture = TestBed.createComponent(CellMenuRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
