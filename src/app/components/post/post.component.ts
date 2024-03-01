import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumService } from 'src/app/forum.service';
import { createReplyPayload } from './reply.payload';
import { throwError } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { createRe_replyPayload } from './re_reply.payload';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [ForumService]
})
export class PostComponent implements OnInit {
  createReplyForm: FormGroup;
  createRe_replyForm: FormGroup;
  replyPayload: createReplyPayload;
  re_replyPayload: createRe_replyPayload;
  context = new FormControl('');
  recommondations = new FormControl(0);
  visibility = new FormControl(true);
  postId: string ='';
  toReplyId: string ='';
  post: any; 
  article : any;
  editedReply: any; 
  editedReplyContent: string = '';
  editedReplyId: string  = '';
  editedRe_reply: any; 
  editedRe_replyContent: string = '';
  editedRe_replyId: string  = '';
  replyClicked: boolean = false;

  constructor(private dialog: MatDialog,private router: Router,private route: ActivatedRoute, private forumService: ForumService) {
    this.createReplyForm = new FormGroup( {
      context: new FormControl('', Validators.required),
      recommondations: new FormControl(0, Validators.required),
      visibility: new FormControl(true, Validators.required),
    })
    this.createRe_replyForm = new FormGroup({
      context: new FormControl('', Validators.required),
      recommondations: new FormControl(0, Validators.required),
      visibility: new FormControl(true, Validators.required),
    })
    this.replyPayload = {
      idReply: '',
      context : '',
      recommondations : 0,
      visibility : true,
      postId : '',

    }
    this.re_replyPayload = {
      idRe_reply: '',
      context : '',
      recommondations : 0,
      visibility : true,
      replyId : '',
    }
  }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postId = params['id'];

      // Use the ID to fetch the specific post
      this.forumService.getPostById(this.postId).subscribe((data: any) => {
        this.post = data;
      });
      /*this.forumService.getArticleById(this.post.articleId).subscribe((data: any) => {
        this.article = data;
      })*/
    });

this.createReplyForm = new FormGroup({
  context : new FormControl('', Validators.required),
  recommondations : new FormControl(0, Validators.required),
  visibility : new FormControl('', Validators.required)

})
  }
  generateReplyId(): string {
    // Combine post ID and a random string/number to generate a unique reply ID
    const replyId = Math.random().toString(36).substring(2, 15);
    return replyId;
  }

  incrementRecommondation() {
    this.replyPayload.recommondations +=1;
    const id= this.replyPayload.idReply;
    this.forumService.updateReply(id,this.replyPayload).subscribe(
      data => {
        this.router.navigateByUrl('/forum');
      },
      error => {
        throwError(error);
        console.error('Error creating reply:', error);
      }
    );
  }
  startEditingReply(reply: any) {
    this.editedReply = reply;
    this.editedReplyContent = reply.context;
    this.editedReplyId = reply.idReply;
  }
  startEditingRe_reply(re_reply: any) {
    this.editedRe_reply = re_reply;
    this.editedRe_replyContent = re_reply.context;
    this.editedRe_replyId = re_reply.idReply;
  }
  onClickReply(replyId: string) {
this.replyClicked =! this.replyClicked;
this.toReplyId = replyId;
}
  cancelEditingReply() {
    this.editedReply = null;
    this.editedReplyContent = '';
  }
  updateReply(id: string){
    if (!this.replyPayload) {
      console.error('Form or payload not properly initialized.');
      return;
    }
   
    const contextControl = this.editedReplyContent;
    if (contextControl) {
      this.replyPayload.context = contextControl || '';
    }


    this.forumService.updateReply(id, this.replyPayload).subscribe(
      data => {
location.reload();
      },
      error => {
        throwError(error);
        console.error('Error updating post:', error);
      }
    );
  }
  updateRe_reply(id: string){
    if (!this.replyPayload) {
      console.error('Form or payload not properly initialized.');
      return;
    }
   
    const contextControl = this.editedRe_replyContent;
    if (contextControl) {
      this.re_replyPayload.context = contextControl || '';
    }


    this.forumService.updateRe_reply(id, this.re_replyPayload).subscribe(
      data => {
location.reload();
      },
      error => {
        throwError(error);
        console.error('Error updating re_reply:', error);
      }
    );
  }
  
  createRe_replyAndAffectToReply() {
    if (!this.createRe_replyForm || !this.re_replyPayload) {
      console.error('Form or payload not properly initialized.');
      return;
    }
   
    const contextControl = this.createRe_replyForm.get('context');
    if (contextControl) {
      this.re_replyPayload.context = contextControl.value || ''; 
    }
   
    this.re_replyPayload.recommondations = 0;
    this.re_replyPayload.visibility = true;
    this.re_replyPayload.replyId = this.toReplyId;
    this.re_replyPayload.idRe_reply = this.generateReplyId();
 
     this.forumService.createRe_reply(this.re_replyPayload).subscribe(
      data => {
      location.reload();
      },
      error => {
        throwError(error);
        console.error('Error creating re_reply:', error);
      }
    );

  }

  createReplyAndAffectToPost() {
    if (!this.createReplyForm || !this.replyPayload) {
      console.error('Form or payload not properly initialized.');
      return;
    }
   
    const contextControl = this.createReplyForm.get('context');
    if (contextControl) {
      this.replyPayload.context = contextControl.value || ''; // Set to an empty string if value is undefined or null
    }
   
    this.replyPayload.recommondations = 0;
    this.replyPayload.visibility = true;
    this.replyPayload.postId = this.postId; // Set postId from the route parameters
    this.replyPayload.idReply = this.generateReplyId();
 
     this.forumService.createReply(this.replyPayload).subscribe(
      data => {
      location.reload();
      },
      error => {
        throwError(error);
        console.error('Error creating reply:', error);
      }
    );

  }
  deleteRe_reply(id: string) {
    this.forumService.deleteRe_reply(id).subscribe(
      data => {
        location.reload();
      },
      error => {
        throwError(error);
        console.error('Error deleting re_reply:', error);
      }
    )
  }
  openDeleteRe_replyConfirmationDialog(re_replyId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px', // Set the width as per your design
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this reply?',
      },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRe_reply(re_replyId);
      }
    });
  }
  deleteReply(id: string) {
    this.forumService.deleteReply(id).subscribe(
      data => {
        location.reload();
      },
      error => {
        throwError(error);
        console.error('Error deleting reply:', error);
      }
    )
  }
  openDeleteReplyConfirmationDialog(replyId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px', // Set the width as per your design
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this reply?',
      },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteReply(replyId);
      }
    });
  }
}
