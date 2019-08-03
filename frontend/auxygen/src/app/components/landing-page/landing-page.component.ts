import { Component, OnInit } from '@angular/core';
import { SpotifyAuthorizationService } from 'src/app/services/spotify-authorization.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private spotifyAuthorizationService: SpotifyAuthorizationService) { }

  ngOnInit() {
  }

  login() {
    this.spotifyAuthorizationService.authorize();
  }

}
