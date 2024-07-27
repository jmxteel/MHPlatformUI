import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionContentComponent } from './production-content.component';

describe('ProductionContentComponent', () => {
  let component: ProductionContentComponent;
  let fixture: ComponentFixture<ProductionContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductionContentComponent]
    });
    fixture = TestBed.createComponent(ProductionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
