import { TestBed } from '@angular/core/testing';

import { FooCrudService } from './foo-crud.service';

describe('FooCrudService', () => {
  let service: FooCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FooCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
