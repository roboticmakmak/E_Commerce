import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDComponent } from './category-d.component';

describe('CategoryDComponent', () => {
  let component: CategoryDComponent;
  let fixture: ComponentFixture<CategoryDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryDComponent]
    });
    fixture = TestBed.createComponent(CategoryDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
