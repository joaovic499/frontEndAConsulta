import { TestBed } from '@angular/core/testing';

import { GuardsAuthService } from './guards-auth.service';

describe('GuardsAuthService', () => {
  let service: GuardsAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardsAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
