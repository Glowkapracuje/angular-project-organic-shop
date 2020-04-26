import { TestBed, inject } from '@angular/core/testing';

import { AdminAuthGuardService } from 'shared/services/admin-auth-guard.service';

describe('AdminAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminAuthGuardService]
    });
  });

  it('should be created', inject([AdminAuthGuardService], (service: AdminAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
