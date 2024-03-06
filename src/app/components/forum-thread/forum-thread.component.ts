import { Component, Input, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { ForumService } from 'src/app/forum.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forum-thread',
  templateUrl: './forum-thread.component.html',
  styleUrls: ['./forum-thread.component.css'],
  providers: [ForumService]
})
export class ForumThreadComponent implements OnInit {
  @Input() posts: any[] = [];
  @Input() followCount : Map<string, number> = new Map();
  @Input() votesCount : Map<string, number> = new Map();

  followedPosts: Set<string> = new Set(); 
  idUser: string = 'static';
  votedPosts: Set<string> = new Set();
  votingState: { [postId: string]: { voteUpClicked: boolean; voteDownClicked: boolean } } = {};
 
  constructor(private dialog: MatDialog, private forumService: ForumService, private cdr: ChangeDetectorRef, private toastr: ToastrService) {}

  ngOnInit() {
    console.log('on init .....');
    this.fetchFollowedPosts();

this.cdr.detectChanges();

  }
  calculateTimeDifference(createdAt: string): string {
    const postDate = new Date(createdAt);
    const now = new Date();
  
    const timeDifferenceInMilliseconds = now.getTime() - postDate.getTime();
    const secondsAgo = Math.floor(timeDifferenceInMilliseconds / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
  
    if (daysAgo > 0) {
      return `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
    } else if (hoursAgo > 0) {
      return `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutesAgo > 0) {
      return `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return `${secondsAgo} ${secondsAgo === 1 ? 'second' : 'seconds'} ago`;
    }
  }
  
  
  async fetchFollowedPosts() {
    const storedFollowedPosts = localStorage.getItem('followedPosts');
  
    if (storedFollowedPosts) {
      // If there are stored followed posts in localStorage, use them
      this.followedPosts = new Set(JSON.parse(storedFollowedPosts));
    } else {
      // If no stored followed posts, fetch from the server
     await this.forumService.getPostFollowList(this.idUser).subscribe(
        (response: any) => {
          // Assuming the server returns an array of followed post IDs
          this.followedPosts = new Set((response as any[]).map((post: any) => post.idPost));
          console.log(response);
          
          // Save the fetched data to localStorage
          localStorage.setItem('followedPosts', JSON.stringify(Array.from(this.followedPosts)));
        },
        (error: any) => {
          // Handle error
          console.error('Error fetching followed posts:', error);
        }
      );
    }
  }
  
  
  isPostFollowed(idPost: string): boolean {
    // Check if the post is followed by the user
    return this.followedPosts.has(idPost);
  }

  toggleFollow(idPost: string) {
    // Toggle follow/unfollow based on the current state
    if (this.isPostFollowed(idPost)) {
      this.unfollowPost(idPost);
    } else {
      this.followPost(idPost);
    }
  }

  unfollowPost(idPost: string) {
    this.forumService.unfollowPost(idPost, this.idUser).subscribe(
      (response: any) => {
        this.toastr.info("Post removed from your follow list!", "Unfollowed");

        // Handle successful response
        console.log(this.idUser, 'unfollowed', idPost);
        // Update followedPosts set
        this.followedPosts.delete(idPost);
      },
      (error: any) => {
        // Handle error
        console.error('Unfollow failed:', error);
        // Optionally, display an error message to the user or perform other actions
      }
      
    )
    this.followedPosts.delete(idPost);
    localStorage.setItem('followedPosts', JSON.stringify(Array.from(this.followedPosts)));

  }

  deletePost(id: string) {
    this.forumService.deletePost(id).subscribe(
      () => {
        this.followedPosts.delete(id);
        location.reload();
        this.toastr.info("Post successfully deleted!", "Deleted");
      },
      (error: any) => {
        throwError(error);
        console.error('Error deleting post:', error);
      }
    );
  }

  followPost(idPost: string) {
    this.forumService.followPost(idPost, this.idUser).subscribe(
      () => {
        this.toastr.success("Post added to your follow list!", "Followed");
        // Handle successful response
        console.log(this.idUser, 'followed', idPost);
        // Update followedPosts set
        this.followedPosts.add(idPost);
        localStorage.setItem('followedPosts', JSON.stringify(Array.from(this.followedPosts)));

      },
      (error: any) => {
        // Handle error
        console.error('Follow failed:', error);
        // Optionally, display an error message to the user or perform other actions
      }
    );
  }

  openDeleteConfirmationDialog(postId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this post?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePost(postId);
      }
    });
  }
  voteUp(postId: string, userId: string){
    this.forumService.voteUpPost(postId, this.idUser).subscribe(
      () => {
        // Handle successful response
        console.log(this.idUser, 'voted', postId);
        // Update followedPosts set
        this.votedPosts.add(postId);
        localStorage.setItem('votedPosts', JSON.stringify(Array.from(this.votedPosts)));
        if (!this.votingState[postId]) {
          this.votingState[postId] = { voteUpClicked: false, voteDownClicked: false };
        }
      
        // Set the state for the clicked post
        this.votingState[postId].voteUpClicked = true;
        this.votingState[postId].voteDownClicked = false;
      },
      (error: any) => {
        // Handle error
        console.error('Follow failed:', error);
        // Optionally, display an error message to the user or perform other actions
      }
    );
  }
  voteDown(postId: string, userId: string){
    this.forumService.voteDownPost(postId, this.idUser).subscribe(
      () => {
        // Handle successful response
        console.log(this.idUser, 'unvoted', postId);
        // Update followedPosts set
        this.votedPosts.delete(postId);
        localStorage.setItem('votedPosts', JSON.stringify(Array.from(this.votedPosts)));
        if (!this.votingState[postId]) {
          this.votingState[postId] = { voteUpClicked: false, voteDownClicked: false };
        }
      
        // Set the state for the clicked post
        this.votingState[postId].voteUpClicked = false;
        this.votingState[postId].voteDownClicked = true;
      },
      (error: any) => {
        // Handle error
        console.error('Follow failed:', error);
        // Optionally, display an error message to the user or perform other actions
      }
    );
  }
}
