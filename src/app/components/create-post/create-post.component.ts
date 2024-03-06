import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ForumService } from 'src/app/forum.service';
import { CreatePostPayload } from './create-post.payload';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  articles: any[] = [];
  createPostForm: FormGroup;
  postPayload: CreatePostPayload;

  constructor(private router: Router, private forumService: ForumService, private toastr: ToastrService) {
    this.createPostForm = new FormGroup({
      titre: new FormControl('', Validators.required),
      articleId: new FormControl(''),
      context: new FormControl('', Validators.required),
      createdAt: new FormControl(new Date().toISOString()), // Default to current date in the desired format
      updatedAt: new FormControl(new Date().toISOString()),
    });

    this.postPayload = {
      titre: '',
      articleId: '',
      context: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      followedBy: ['static'],
    };
  }

  ngOnInit() {
    this.forumService.getArticles().subscribe((data: any) => {
      this.articles = data;
    });
  }

  createPost() {
    if (!this.createPostForm || !this.postPayload) {
      console.error('Form or payload not properly initialized.');
      return;
    }
  
    if (this.createPostForm.valid) {
      const titreControl = this.createPostForm.get('titre');
      const articleControl = this.createPostForm.get('articleId');
      const contextControl = this.createPostForm.get('context');
  
      if (titreControl && articleControl && contextControl) {
        this.postPayload.titre = titreControl.value || '';
        this.postPayload.articleId = articleControl.value || '';
        this.postPayload.context = contextControl.value || '';
  
        this.forumService.createPost(this.postPayload).subscribe(
          data => {
            if (data === null) {
              this.toastr.error("Bad words and context are not acceptable in Courzelo's forum", "Bad Context!");
            } else {
              this.toastr.success("Post successfully created!", "Success");
              this.router.navigateByUrl('/forum');
            }
          },
          
          error => {
            console.log(error);
            throwError(error);
            console.error('Error creating post:', error);
          }
        );
      }
    } else {
      this.toastr.error('Please provide all the necessary details for your post!', 'Error');
    }
  }
  

  editorConfig = {
    height: 200,
    menubar: true,
    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tableofcontents footnotes mergetags autocorrect typography inlinecss',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    ai_request: (request : any, respondWith : any) => {
      const openAiOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          temperature: 0.7,
          max_tokens: 400,
          messages: [{ role: 'user', content: request.prompt }],
        })
      };
      respondWith.string((signal : any) => window.fetch('https://api.openai.com/v1/chat/completions', { signal, ...openAiOptions })
        .then(async (response) => {
          if (response) {
            const data = await response.json();
            if (data.error) {
              throw new Error(`${data.error.type}: ${data.error.message}`);
            } else if (response.ok) {
              // Extract the response content from the data returned by the API
              return data?.choices[0]?.message?.content?.trim();
            }
          } else {
            throw new Error('Failed to communicate with the AI API');
          }
        })
      );
    }
  }
}
