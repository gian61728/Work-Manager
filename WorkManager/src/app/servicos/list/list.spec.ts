import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServico } from './list';

describe('List', () => {
  let component: ListServico;
  let fixture: ComponentFixture<ListServico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListServico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListServico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
