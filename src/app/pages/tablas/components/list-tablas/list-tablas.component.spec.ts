import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTablasComponent } from './list-tablas.component';

describe('ListTablasComponent', () => {
  let component: ListTablasComponent;
  let fixture: ComponentFixture<ListTablasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTablasComponent]
    });
    fixture = TestBed.createComponent(ListTablasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
