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

  constructor(private accessTokenService: AccessTokenService,
    private apiService: ApiService,
    private router: Router,
    private leaderService: LeaderService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.accessToken = this.accessTokenService.accessToken;
    // Get access token if they force to /leader
    if (!this.accessToken) {
      this.router.navigate([''])
    }
    this.userName = this.route.snapshot.paramMap.get('username')
  }

  createLeader() {
    this.apiService.createLeader(this.userName, this.accessToken);
    var url = '/leader/' + this.userName;
    this.router.navigate([url])
  }


}
