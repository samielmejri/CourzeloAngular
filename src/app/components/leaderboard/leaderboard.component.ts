import { Component, Input, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { ForumService } from 'src/app/forum.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
@Input() leaderboardPosts : any[] = [];
constructor(private forumService: ForumService){}

ngOnInit(){
  console.log(this.leaderboardPosts)
}

}
