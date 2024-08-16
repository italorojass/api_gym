import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedorComponent } from './mantenedor.component';

describe('MantenedorComponent', () => {
  let component: MantenedorComponent;
  let fixture: ComponentFixture<MantenedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
