import { TestBed } from '@angular/core/testing';

import { FirebaseGuardsService } from './firebase-guards.service';

describe('FirebaseGuardsService', () => {
  let service: FirebaseGuardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseGuardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
