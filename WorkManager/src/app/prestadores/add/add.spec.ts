import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrestadores } from './add';

describe('Add', () => {
  let component: AddPrestadores;
  let fixture: ComponentFixture<AddPrestadores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPrestadores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPrestadores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
