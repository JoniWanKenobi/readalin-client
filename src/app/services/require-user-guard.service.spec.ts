import { TestBed, inject } from '@angular/core/testing';

import { RequireUserGuardService } from './require-user-guard.service';

describe('RequireUserGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequireUserGuardService]
    });
  });

  it('should be created', inject([RequireUserGuardService], (service: RequireUserGuardService) => {
    expect(service).toBeTruthy();
  }));
});
