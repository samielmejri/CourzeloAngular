import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { ForumService } from 'src/app/forum.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-forum-thread',
  templateUrl: './forum-thread.component.html',
  styleUrls: ['./forum-thread.component.css'],
  providers: [ForumService]

})
export class ForumThreadComponent  implements OnInit{
  @Input() posts: any[] = [];

//  posts: any[] = [];
  constructor(private dialog: MatDialog,private router : Router,private forumService : ForumService) {}

  ngOnInit() {
    console.log('on init .....');
  }
  deletePost(id: string) {
    this.forumService.deletePost(id).subscribe(
      data => {
        location.reload();
      },
      error => {
        throwError(error);
        console.error('Error deleting post:', error);
      }
    )
  }
  openDeleteConfirmationDialog(postId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px', // Set the width as per your design
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
  
  }
