import { TestBed, inject } from '@angular/core/testing';

import { RequireAnonGuardService } from './require-anon-guard.service';

describe('RequireAnonGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequireAnonGuardService]
    });
  });

  it('should be created', inject([RequireAnonGuardService], (service: RequireAnonGuardService) => {
    expect(service).toBeTruthy();
  }));
});
