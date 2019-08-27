import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { LeaderService } from './leader.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {



  constructor(private httpClient: HttpClient, private leaderService: LeaderService) { }

  createLeader(name: string, accessToken: string, callbackFunction: Function, router: Router) {
    var postURL = AppConstants.apiURL;
    postURL += '/leader';
    var body = { "name": name, "access_token": accessToken };
    this.httpClient.post(postURL, body).subscribe(val => {
      this.leaderService.id = val["id"];
      this.leaderService.partyRoom = val["party_room"];
      console.log("Post was successfull");
      callbackFunction(name, router);
    });
  }

}
