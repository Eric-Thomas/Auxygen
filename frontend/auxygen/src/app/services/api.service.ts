import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  createLeader(name: string, accessToken: string): Observable<Object>{
    let postURL = AppConstants.apiURL;
    postURL += '/leader';
    let body = { "name": name, "access_token": accessToken };
    // POST returns id and party room which are written to leaderService
    return this.httpClient.post(postURL, body);
  }

  postFallbackPlaylist(name: string, tracksUri: string, id: string) {
    let postURL = AppConstants.apiURL;
    postURL += '/leader/fallbackplaylist';
    let body = {"name": name, "tracksUri": tracksUri, "id": id};
    this.httpClient.post(postURL, body);
  }


}
