import { Component, OnInit } from '@angular/core';
import { AccessTokenService } from 'src/app/services/access-token.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-leader',
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.css']
})
export class LeaderComponent implements OnInit {

  private accessToken = '';
  private userName = '';

  constructor(private accessTokenService: AccessTokenService, private apiService: ApiService) { }

  ngOnInit() {
    this.accessToken = this.accessTokenService.accessToken;
  }

  createLeader() {
    console.log("createing leader: " + this.userName);
    this.apiService.createLeader(this.userName, this.accessToken);
  }


}
