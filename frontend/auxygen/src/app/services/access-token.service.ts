import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccessTokenService {

  private _accessToken = '';

  constructor() { }

  get accessToken(): string {
    return this._accessToken
  }
  set accessToken(value: string) {
    this._accessToken = value;
  }

}
