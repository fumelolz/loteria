import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTablaComponent } from './detail-tabla.component';

describe('DetailTablaComponent', () => {
  let component: DetailTablaComponent;
  let fixture: ComponentFixture<DetailTablaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailTablaComponent]
    });
    fixture = TestBed.createComponent(DetailTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
