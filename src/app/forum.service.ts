import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreatePostPayload } from './components/create-post/create-post.payload';
import { Observable } from 'rxjs';
import { ArticleModel } from './components/create-article/create-article.payload';
import { createReplyPayload } from './components/post/reply.payload';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  readonly API_URL = 'http://localhost:9090'
   
  constructor(private HttpClient: HttpClient ) {

   }
   
   getReplies() {
    return this.HttpClient.get(this.API_URL+'/reply/getAll')
   }
   updateReply (id :string,replyPlayload : createReplyPayload) {
    return this.HttpClient.put(`${this.API_URL}/reply/update/${id}`, replyPlayload)

   }
   
   createReply(replyPlayload : createReplyPayload) {
    return this.HttpClient.post(this.API_URL+'/reply/saveReply', replyPlayload)
   }

   createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.HttpClient.post(this.API_URL+'/post/savePost', postPayload)
   }
   updatePost(id :string,postPayload : CreatePostPayload) {
    return this.HttpClient.put(`${this.API_URL}/post/update/${id}`, postPayload)
   }
   
   deletePost(id :string) {
    return this.HttpClient.delete(`${this.API_URL}/post/delete/${id}`)
   }
   deleteReply(id :string) {
    return this.HttpClient.delete(`${this.API_URL}/reply/delete/${id}`)
   }
   deleteArticle(id :string) {
    return this.HttpClient.delete(`${this.API_URL}/article/delete/${id}`)
   }
   createArticle(articleModel: ArticleModel): Observable<any> {
    return this.HttpClient.post(this.API_URL+'/article/add', articleModel)
   }
   getArticles () {
    return this.HttpClient.get(this.API_URL+'/article/getAll')
   }
   getArticleById(id: string) : Observable<any> {
    return this.HttpClient.get(`${this.API_URL}/article/${id}`);
   }
   getPosts() {
    return this.HttpClient.get(this.API_URL+'/post/getAll')
   }
   getPostById(id: string): Observable<any> {
    return this.HttpClient.get(`${this.API_URL}/post/${id}`);
   }

}
