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
    console.log("set id")
    this._id = value;
  }
  get partyRoom(): string {
    return this._partyRoom
  }
  set partyRoom(value: string) {
    console.log("set party room")
    this._partyRoom = value;
  }
}
