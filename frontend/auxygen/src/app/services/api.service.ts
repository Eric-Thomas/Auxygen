import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { LeaderService } from './leader.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {



  constructor(private httpClient: HttpClient, private leaderService: LeaderService) { }

  createLeader(name: string, accessToken: string, callbackFunction: Function, router: Router) {
    let postURL = AppConstants.apiURL;
    postURL += '/leader';
    let body = { "name": name, "access_token": accessToken };
    this.httpClient.post(postURL, body).subscribe(val => {
      this.leaderService.id = val["id"];
      this.leaderService.partyRoom = val["party_room"];
      console.log("Post was successfull");
      callbackFunction(name, router);
    });
  }

  getPlaylists() {
    let id = this.leaderService.id;
    let accessToken = '';
    this.httpClient.get(AppConstants.apiURL + '/leader/' + id + '/accesstoken').subscribe(response => {
      accessToken = response["access_token"];
      let url = 'https://api.spotify.com/v1/me/playlists'
      let headers = new HttpHeaders();

      headers = headers.append("Authorization", "Bearer " + accessToken);
      let params = new HttpParams();
      params = params.append("limit", "50");
      this.httpClient.get(url, { headers, params }).subscribe(playlists => {
        console.log(playlists);
      });
    })
  }

}
