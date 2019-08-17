import { Component, OnInit } from '@angular/core';
import { AccessTokenService } from 'src/app/services/access-token.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leader',
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.css']
})
export class LeaderComponent implements OnInit {

  private accessToken = '';
  private userName = '';

  constructor(private accessTokenService: AccessTokenService, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.accessToken = this.accessTokenService.accessToken;
  }

  createLeader() {
    this.apiService.createLeader(this.userName, this.accessToken);
    var url = '/leader/' + this.userName;
    this.router.navigate([url])
  }


}
