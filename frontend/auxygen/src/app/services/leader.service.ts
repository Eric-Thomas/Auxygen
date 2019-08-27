import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  private _id = '';
  private _partyRoom = '';

  constructor() { }

  get id(): string {
    return this._id
  }
  set id(value: string) {
    this._id = value;
  }
  get partyRoom(): string {
    return this._partyRoom
  }
  set partyRoom(value: string) {
    this._partyRoom = value;
  }
}
