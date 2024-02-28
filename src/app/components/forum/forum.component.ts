import { Component } from '@angular/core';
import { ForumService } from 'src/app/forum.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  providers: [ForumService]

})
export class ForumComponent implements OnInit {
  title = 'forum';
  replies: any[] = [];
  posts: any[] = [];
  articles: any[] = []; 
  sortedPosts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5; // Adjust as needed

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
}
