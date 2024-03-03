import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ArticleModel } from './create-article.payload';
import { Router } from '@angular/router';
import { ForumService } from 'src/app/forum.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {
  createArticleForm: FormGroup;
  articleModel: ArticleModel;
  title = new FormControl('');
  description = new FormControl('');
  followedBy = new FormControl('');

  constructor(private router: Router, private forumService: ForumService) {
    this.createArticleForm = new FormGroup({
      titre: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    });
    this.articleModel = {
      titre: '',
      category: '',
      score:0,
      followedBy: ['static']
    }
  }

  ngOnInit() {
    this.createArticleForm = new FormGroup({
      titre: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });
  
    this.articleModel = { titre: '', category: '', followedBy:['static'] }; 
  }

  discard() {
    this.router.navigateByUrl('/');
  }

  createArticle() {
    if (!this.createArticleForm || !this.articleModel) {
      console.error('Form or payload not properly initialized.');
      return;
    }
  
    const titreControl = this.createArticleForm.get('titre');
    if (titreControl) {
      this.articleModel.titre = titreControl.value || ''; // Set to an empty string if value is undefined or null
    }
  
    const articleControl = this.createArticleForm.get('category');
    if (articleControl) {
      this.articleModel.category = articleControl.value || ''; // Set to an empty string if value is undefined or null
    }
  
    this.forumService.createArticle(this.articleModel).subscribe(data => {
      this.router.navigateByUrl('/forum');
    }, error => {
      throwError(error);
    })
  }

}
