import { TestBed } from '@angular/core/testing';

import { DataResolver } from './data-resolver.service';

describe('DataResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataResolver = TestBed.get(DataResolver);
    expect(service).toBeTruthy();
  });
});
