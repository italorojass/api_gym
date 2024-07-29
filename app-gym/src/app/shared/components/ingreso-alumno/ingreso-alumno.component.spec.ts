import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoAlumnoComponent } from './ingreso-alumno.component';

describe('IngresoAlumnoComponent', () => {
  let component: IngresoAlumnoComponent;
  let fixture: ComponentFixture<IngresoAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoAlumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresoAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
