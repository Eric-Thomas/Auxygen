import { TestBed } from '@angular/core/testing';

import { SpotifyLoginService } from './spotify-login.service';

describe('SpotifyLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpotifyLoginService = TestBed.get(SpotifyLoginService);
    expect(service).toBeTruthy();
  });
});
