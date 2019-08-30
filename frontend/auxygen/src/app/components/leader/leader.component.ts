import { Component, OnInit } from '@angular/core';
import { AccessTokenService } from 'src/app/services/access-token.service';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LeaderService } from 'src/app/services/leader.service';
import { SpotifyAPIService } from 'src/app/services/spotifyAPI.service';

@Component({
  selector: 'app-leader',
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.css']
})
export class LeaderComponent implements OnInit {

  private accessToken = '';
  private userName = '';
  private playlists = [];
  private fallbackPlaylistSelected = false;

  constructor(private accessTokenService: AccessTokenService,
    private router: Router,
    private route: ActivatedRoute,
    private spotifyAPIService: SpotifyAPIService,
    private apiService:ApiService,
    private leaderService: LeaderService) { }

  ngOnInit() {
    this.accessToken = this.accessTokenService.accessToken;
    // return to home page if they do not have an access token
    if (!this.accessToken) {
      this.router.navigate([''])
    }
    this.userName = this.route.snapshot.paramMap.get('username');
    if (this.userName) {
      this.spotifyAPIService.getPlaylists().subscribe(res => {
        console.log("SDFDSH" + res);
        for (let item of res["items"]){
          let name = item["name"];
          let tracksUri = item["tracks"]["href"];
          this.playlists.push({name, tracksUri})
          console.log(name + " was added");
        }
      });
    }
  }

  createFallback(index: number){
    this.fallbackPlaylistSelected = true;
    let playlist = this.playlists[index];
    this.spotifyAPIService.getTracks(playlist["tracksUri"]);
    // this.apiService.postFallbackPlaylist(playlist["name"], playlist["tracksUri"], this.leaderService.id);
  }

}
