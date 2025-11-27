import { TestBed } from '@angular/core/testing';
import { Prestadores } from './prestadores';

describe('Prestadores', () => {
  let service: Prestadores;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Prestadores);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
