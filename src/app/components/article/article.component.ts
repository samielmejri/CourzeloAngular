import { Component } from '@angular/core';
import { ForumService } from 'src/app/forum.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  currentPage: number = 1;
  itemsPerPage: number = 5; // Adjust as needed
  posts: any[] = [];
  articles: any[] = []; 
  sortedPosts: any[] = [];
  followedArticles: Set<string> = new Set(); 
  idUser: string = 'static';

  get totalPages(): number {
    return Math.ceil(this.posts.length / this.itemsPerPage);
  }

  get paginatedPosts(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.posts.slice(startIndex, endIndex);
  }
  changePage(page: number | 'prev' | 'next'): void {
    if (page === 'prev' && this.currentPage > 1) {
      this.currentPage--;
    } else if (page === 'next' && this.currentPage < this.totalPages) {
      this.currentPage++;
    } else if (typeof page === 'number') {
      this.currentPage = page;
    }
  }
  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
  constructor(private forumService: ForumService) {}

  ngOnInit() {
    console.log('on init .....');
    this.fetchFollowedArticles();
    console.log(this.followedArticles)
    this.forumService.getPosts().subscribe((data :any) => {
      this.posts = data;
    }) 
    this.forumService.getArticles().subscribe((data :any) => {
      this.articles = data;
    }) 
    this.forumService.getPosts().subscribe((data :any) => {
      this.posts.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

      // Get only the last 3 posts
      this.sortedPosts = this.posts.slice(0, 3);   
     }) 
    
  }
  fetchFollowedArticles() {
    const storedFollowedArticles = localStorage.getItem('followedArticles');
  
    if (storedFollowedArticles) {
      // If there are stored followed posts in localStorage, use them
      this.followedArticles = new Set(JSON.parse(storedFollowedArticles));
    } else {
      // If no stored followed posts, fetch from the server
      this.forumService.getArticleFollowList(this.idUser).subscribe(
        (response: any) => {
          // Assuming the server returns an array of followed post IDs
          this.followedArticles = new Set((response as any[]).map((a: any) => a.idArticle));
          console.log(response);
          
          // Save the fetched data to localStorage
          localStorage.setItem('followedArticles', JSON.stringify(Array.from(this.followedArticles)));
        },
        (error: any) => {
          // Handle error
          console.error('Error fetching followed Articles:', error);
        }
      );
    }
  }
  
  isArticleFollowed(idArticle: string): boolean {
    // Check if the post is followed by the user
    return this.followedArticles.has(idArticle);
  }

  toggleFollow(idArticle: string) {
    // Toggle follow/unfollow based on the current state
    if (this.isArticleFollowed(idArticle)) {
      this.unfollowArticle(idArticle);
    } else {
      this.followArticle(idArticle);
    }
  }

  unfollowArticle(idArticle: string) {
    this.forumService.unfollowArticle(idArticle, this.idUser).subscribe(
      (response: any) => {
        // Handle successful response
        console.log(this.idUser, 'unfollowed', idArticle);
        // Update followedPosts set
        this.followedArticles.delete(idArticle);
      },
      (error: any) => {
        // Handle error
        console.error('Unfollow failed:', error);
        // Optionally, display an error message to the user or perform other actions
      }
      
    )
    this.followedArticles.delete(idArticle);
    localStorage.setItem('followedArticles', JSON.stringify(Array.from(this.followedArticles)));

  }

  followArticle(idArticle: string) {
    this.forumService.followArticle(idArticle, this.idUser).subscribe(
      () => {
        // Handle successful response
        console.log(this.idUser, 'followed', idArticle);
        // Update followedPosts set
        this.followedArticles.add(idArticle);
        localStorage.setItem('followedArticles', JSON.stringify(Array.from(this.followedArticles)));

      },
      (error: any) => {
        // Handle error
        console.error('Follow failed:', error);
        // Optionally, display an error message to the user or perform other actions
      }
    );
  }





}
