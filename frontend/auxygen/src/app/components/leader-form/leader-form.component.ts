import { Component, OnInit } from '@angular/core';
import { AccessTokenService } from 'src/app/services/access-token.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leader-form',
  templateUrl: './leader-form.component.html',
  styleUrls: ['./leader-form.component.css']
})
export class LeaderFormComponent implements OnInit {

  private accessToken = '';
  private userName = '';

  constructor(private accessTokenService: AccessTokenService, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.accessToken = this.accessTokenService.accessToken;
  }

  createLeader() {
    this.apiService.createLeader(this.userName, this.accessToken, this.navigateToLeaderPage, this.router);
  }

  navigateToLeaderPage(userName: string, router: Router) {
    var url = '/leader/' + userName
    router.navigate([url])
  }


}
