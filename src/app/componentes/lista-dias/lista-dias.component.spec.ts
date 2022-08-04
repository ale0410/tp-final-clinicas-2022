import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDiasComponent } from './lista-dias.component';

describe('ListaDiasComponent', () => {
  let component: ListaDiasComponent;
  let fixture: ComponentFixture<ListaDiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
