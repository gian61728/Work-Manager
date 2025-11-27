import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPrestador } from './list';

describe('List', () => {
  let component: ListPrestador;
  let fixture: ComponentFixture<ListPrestador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListPrestador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPrestador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
