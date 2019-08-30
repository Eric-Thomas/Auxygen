import { Component, OnInit } from '@angular/core';
import { AccessTokenService } from 'src/app/services/access-token.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { LeaderService } from 'src/app/services/leader.service';

@Component({
  selector: 'app-leader-form',
  templateUrl: './leader-form.component.html',
  styleUrls: ['./leader-form.component.css']
})
export class LeaderFormComponent implements OnInit {

  private accessToken = '';
  private userName = '';

  constructor(private accessTokenService: AccessTokenService, 
    private apiService: ApiService,
    private leaderService: LeaderService, 
    private router: Router) { }

  ngOnInit() {
    this.accessToken = this.accessTokenService.accessToken;
  }

  createLeader(){
    this.apiService.createLeader(this.userName, this.accessToken).subscribe(resp => {
      this.leaderService.id = resp["id"];
      this.leaderService.partyRoom = resp["party_room"];
      let url = '/leader/' + this.userName
      this.router.navigate([url])
    })
  }

  // navigateToLeaderPage(userName: string, router: Router) {
  //   console.log("username in navigate: " + userName)
  //   let url = '/leader/' + userName
  //   router.navigate([url])
  // }


}
