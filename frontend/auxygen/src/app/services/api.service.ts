import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  createLeader(name: string, accessToken: string) {
    var postURL = AppConstants.apiURL;
    postURL += '/leader';
    var body = {"name" : name, "access_token" : accessToken};
    this.httpClient.post(postURL, body).subscribe(val => {
      console.log("Post was successfull")
      console.log("Name: " + val["name"])
      console.log("Access token: " + val["access_token"])
    });
  }

}
