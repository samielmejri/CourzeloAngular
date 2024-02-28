import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ForumService } from 'src/app/forum.service';
import { CreatePostPayload } from './create-post.payload';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  articles: any[] = [];
  createPostForm: FormGroup;
  postPayload: CreatePostPayload;

  constructor(private router: Router, private forumService: ForumService) {
    this.createPostForm = new FormGroup({
      titre: new FormControl('', Validators.required),
      article: new FormControl('', Validators.required),
      context: new FormControl('', Validators.required),
      createdAt: new FormControl(new Date().toISOString()), // Default to current date in the desired format
      updatedAt: new FormControl(new Date().toISOString()),
    });

    this.postPayload = {
      titre: '',
      article: '',
      context: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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

    const titreControl = this.createPostForm.get('titre');
    if (titreControl) {
      this.postPayload.titre = titreControl.value || '';
    }

    const articleControl = this.createPostForm.get('article');
    if (articleControl) {
      this.postPayload.article = articleControl.value || '';
    }

    const contextControl = this.createPostForm.get('context');
    if (contextControl) {
      this.postPayload.context = contextControl.value || '';
    }

    this.forumService.createPost(this.postPayload).subscribe(
      data => {
        this.router.navigateByUrl('/forum');
      },
      error => {
        throwError(error);
        console.error('Error creating post:', error);
      }
    );
  }

  editorConfig = {
    height: 200,
    menubar: false,
    plugins: 'anchor autolink charmap codesample emoticons  link lists image media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode  advtemplate ai mentions tableofcontents footnotes mergetags autocorrect typography inlinecss',
    toolbar: 'image|code |undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat |aidialog aishortcuts',
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
