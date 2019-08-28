import { Component, OnInit } from '@angular/core';
import { AccessTokenService } from 'src/app/services/access-token.service';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LeaderFormComponent } from '../leader-form/leader-form.component'
import { LeaderService } from 'src/app/services/leader.service';

@Component({
  selector: 'app-leader',
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.css']
})
export class LeaderComponent implements OnInit {

  private accessToken = '';
  private userName = '';
  private playlists = [];
  private fallbackPlaylist = '';

  constructor(private accessTokenService: AccessTokenService,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService) { }

  ngOnInit() {
    this.accessToken = this.accessTokenService.accessToken;
    // return to home page if they do not have an access token
    if (!this.accessToken) {
      this.router.navigate([''])
    }
    this.userName = this.route.snapshot.paramMap.get('username');
    if (this.userName) {
      this.apiService.getPlaylists();
    }
  }


}
