import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroceryModalPage } from './grocery-modal.page';

describe('GroceryModalPage', () => {
  let component: GroceryModalPage;
  let fixture: ComponentFixture<GroceryModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
