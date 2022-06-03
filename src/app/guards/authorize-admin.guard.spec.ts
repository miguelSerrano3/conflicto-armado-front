import { TestBed } from '@angular/core/testing';

import { AuthorizeAdminGuard } from './authorize-admin.guard';

describe('AuthorizeAdminGuard', () => {
  let guard: AuthorizeAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorizeAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
