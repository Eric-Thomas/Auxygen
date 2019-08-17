import { Component, OnInit } from '@angular/core';
import { LeaderService } from 'src/app/services/leader.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  constructor(private leaderService: LeaderService) { }

  ngOnInit() {
    console.log("id: " + this.leaderService.id);
    console.log("party room: " + this.leaderService.partyRoom);
  }

}
