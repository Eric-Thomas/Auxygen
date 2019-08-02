import { Component, OnInit } from '@angular/core';
import { SpotifyLoginService } from 'src/app/services/spotify-login.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private spotifyLoginService: SpotifyLoginService) { }

  ngOnInit() {
  }

  login() {
    this.spotifyLoginService.login();
  }

}
