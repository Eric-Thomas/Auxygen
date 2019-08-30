import { Injectable } from '@angular/core';
import { AccessTokenService } from './access-token.service';
import { HttpHeaders, HttpParams, HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAPIService {

  constructor(private accessToken: AccessTokenService, private httpClient: HttpClient) { }

  getPlaylists(): Observable<Object> {
    let playlists = [];
    let accessToken = this.accessToken.accessToken;
    let url = 'https://api.spotify.com/v1/me/playlists'
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + accessToken);
    let params = new HttpParams();
    params = params.append("limit", "50"); 
    return this.httpClient.get(url, {headers, params});
  }

  getTracks(tracksUri: string){
    let accessToken = this.accessToken.accessToken;
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + accessToken);
    let response: Observable<Object>;
    let tracks = [];
    let noMoreSongs = false;
    for (let i = 0; i < 100; i++){
      let params = new HttpParams();
      console.log(i);
      params.append("offset", i.toString());
      console.log(params);
      this.httpClient.get(tracksUri, {headers, params}).subscribe(resp => {
        if (!resp["items"]){
          console.log("no more songs");
          noMoreSongs = true;
        }
        console.log("getting offset " + i);
        for (let item of resp["items"]){
          let name = item["track"]["name"];
          let uri = item["track"]["uri"];
          tracks.push({"name": name, "uri": uri});
        }
      });
      if (noMoreSongs){
        break;
      }
    }
  }

}
