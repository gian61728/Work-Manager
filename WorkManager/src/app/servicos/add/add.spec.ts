import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addservicos } from './add';

describe('Add', () => {
  let component: Addservicos;
  let fixture: ComponentFixture<Addservicos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Addservicos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addservicos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
