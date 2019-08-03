import { TestBed } from '@angular/core/testing';

import { SpotifyAuthorizationService } from './spotify-authorization.service';

describe('SpotifyAuthorizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpotifyAuthorizationService = TestBed.get(SpotifyAuthorizationService);
    expect(service).toBeTruthy();
  });
});
