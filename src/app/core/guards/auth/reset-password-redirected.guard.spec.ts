import { TestBed } from '@angular/core/testing';

import { ResetPasswordRedirectedGuard } from './reset-password-redirected.guard';

describe('ResetPasswordRedirectedGuard', () => {
  let guard: ResetPasswordRedirectedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ResetPasswordRedirectedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
