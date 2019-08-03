import { Component, OnInit } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';
import { AccessTokenService } from 'src/app/services/access-token.service';

@Component({
  selector: 'app-leader',
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.css']
})
export class LeaderComponent implements OnInit {

  private accessToken = '';

  constructor(private accessTokenService: AccessTokenService) { }

  ngOnInit() {
    this.accessToken = this.accessTokenService.accessToken;
  }


}
