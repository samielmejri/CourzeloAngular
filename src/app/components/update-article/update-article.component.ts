import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ArticleModel } from '../create-article/create-article.payload';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumService } from 'src/app/forum.service';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent {
  updateArticleForm: FormGroup;
  articles: any[] = [];
  articlePayload : ArticleModel;
  articleId: string = ""; 

  constructor(
    private router: Router,
    private forumService: ForumService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.updateArticleForm = this.formBuilder.group({
      titre: new FormControl('', Validators.required),
      category :new FormControl('', Validators.required),
      
    });

    this.articlePayload = {
      titre: '',
      category: '',
      
    };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.articleId = params['articleId']; // Assign the postId
      this.forumService.getArticleById(this.articleId).subscribe((article: any) => {
        // Update the form with the retrieved post details
        this.updateArticleForm.patchValue({
          titre: article.titre,
          category : article.category
        });
      });
    });
  }
  discard() {
    this.router.navigateByUrl('/');
  }
  updateArticle() {
    if (!this.updateArticleForm || !this.articlePayload) {
      console.error('Form or payload not properly initialized.');
      return;
    }
    if (this.updateArticleForm.valid) {
    const titreControl = this.updateArticleForm.get('titre');
    if (titreControl) {
      this.articlePayload.titre = titreControl.value || '';
    }
  
   
  
    const categoryControl = this.updateArticleForm.get('category');
    if (categoryControl) {
      this.articlePayload.category = categoryControl.value || '';
    }


    this.forumService.updateArticle(this.articleId, this.articlePayload).subscribe(
      data => {
        if (data === null) {
          this.toastr.error("Bad words and context are not acceptable in Courzelo's forum", "Bad Context!");
        } else {
        this.toastr.success("Article successfully updated!", "Success");
        this.router.navigateByUrl('/forum');
       } },
      error => {
        throwError(error);
        console.error('Error updating post:', error);
      }
    );} else {
      this.toastr.error('Please provide all the necessary details for your post!', 'Error');

    }
  }
}
