import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTablaComponent } from './add-tabla.component';

describe('AddTablaComponent', () => {
  let component: AddTablaComponent;
  let fixture: ComponentFixture<AddTablaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTablaComponent]
    });
    fixture = TestBed.createComponent(AddTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
