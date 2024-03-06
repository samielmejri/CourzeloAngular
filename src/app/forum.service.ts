import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreatePostPayload } from './components/create-post/create-post.payload';
import { Observable } from 'rxjs';
import { ArticleModel } from './components/create-article/create-article.payload';
import { createReplyPayload } from './components/post/reply.payload';
import { createRe_replyPayload } from './components/post/re_reply.payload';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  readonly API_URL = 'http://localhost:9090'
   
  constructor(private HttpClient: HttpClient ) {
   }
   updateArticle(id :string,articlePayload : ArticleModel){
    return this.HttpClient.put(`${this.API_URL}/article/update/${id}`, articlePayload)

   }
   getPostFollowList(idUser: string) {
    return this.HttpClient.get(`${this.API_URL}/post/followed/${idUser}`)
   }
   getArticleFollowList(idUser: string) {
    return this.HttpClient.get(`${this.API_URL}/article/followed/${idUser}`)
   }

   followPost(idPost : string, idUser : string): Observable<any>{
    return this.HttpClient.post(`${this.API_URL}/post/followPost/${idPost}/${idUser}`, {})
   }
   followArticle(idArticle : string, idUser : string): Observable<any>{
    return this.HttpClient.post(`${this.API_URL}/post/followArticle/${idArticle}/${idUser}`, {})
  }
  unfollowArticle(idArticle : string, idUser : string): Observable<any>{
    return this.HttpClient.post(`${this.API_URL}/post/infollowArticle/${idArticle}/${idUser}`, {})
  }
  unfollowPost(idPost : string, idUser : string): Observable<any>{
    return this.HttpClient.post(`${this.API_URL}/post/unfollowPost/${idPost}/${idUser}`, {})
  }
 voteUpPost(idPost: string, idUser: string): Observable<any> {
   return this.HttpClient.post(`${this.API_URL}/post/voteUp/${idPost}/${idUser}`, {})
 }
 voteDownPost(idPost: string, idUser: string): Observable<any> {
  return this.HttpClient.post(`${this.API_URL}/post/voteDown/${idPost}/${idUser}`, {})
}
voteUpArticle(idArticle: string, idUser: string): Observable<any> {
  return this.HttpClient.post(`${this.API_URL}/article/voteUp/${idArticle}/${idUser}`, {})
}
voteDownArticle(idArticle: string, idUser: string): Observable<any> {
  return this.HttpClient.post(`${this.API_URL}/article/voteDown/${idArticle}/${idUser}`, {})
}
   getPostsByArticleId(id: string) {
    return this.HttpClient.get(`${this.API_URL}/post/by/${id}`)
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
   getRe_replies() {
    return this.HttpClient.get(this.API_URL+'/re_reply/getAll')
   }
   updateRe_reply (id :string,re_replyPlayload : createRe_replyPayload) {
    return this.HttpClient.put(`${this.API_URL}/re_reply/update/${id}`, re_replyPlayload)
   }
   deleteRe_reply(id :string) {
    return this.HttpClient.delete(`${this.API_URL}/re_reply/delete/${id}`)
   }
   createRe_reply(re_replyPlayload : createRe_replyPayload) {
    return this.HttpClient.post(this.API_URL+'/re_reply/saveRe_reply', re_replyPlayload)
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
