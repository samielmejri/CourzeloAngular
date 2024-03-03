import { ChangeDetectorRef, Component } from '@angular/core';
import { ForumService } from 'src/app/forum.service';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  leaderboardPosts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5; 
  forumName : string ="";
  followersCountMap: Map<string, number> = new Map();
  votesCountMap: Map<string, number> = new Map();

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
    
  constructor(private forumService: ForumService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    
    console.log('on init .....');
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      // If ID is provided, get posts with the specified articleId
      this.forumService.getPostsByArticleId(id).subscribe((data: any) => {
        this.posts = data;
        this.posts.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        this.sortedPosts = this.posts.slice(0, 3);   
        this.forumService.getArticleById(id).subscribe((data :any) => {
          this.forumName = data.titre;
        }) 
      });
    } else {
    this.forumService.getPosts().subscribe((data :any) => {
      this.posts = data;
      this.posts.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      this.sortedPosts = this.posts.slice(0, 3);   
      this.countFollowersForPosts(this.posts);
      this.countVotesForPosts(this.posts);
      this.cdr.detectChanges();
      this.posts.sort((a, b) => {
        // Assuming ratings is an array of strings
        const ratingsCountA = a.ratings ? a.ratings.length : 0;
        const ratingsCountB = b.ratings ? b.ratings.length : 0;
    
        // Sort in descending order (higher count first)
        return ratingsCountB - ratingsCountA;
      });
    
      // Assign sorted posts to leaderboardPosts array
      this.leaderboardPosts = [...this.posts.slice(0,3)];
    }) 
   
  }
    this.forumService.getArticles().subscribe((data :any) => {
      this.articles = data;
    }) 

    
  }
  countFollowers(post: any): number {
    const postFollowers = post.followedBy.length;
    return postFollowers;
  }
  countFollowersForPosts( posts: any[]) {
    posts.forEach(post => {
      const followersCount = this.countFollowers(post);
      this.followersCountMap.set(post.idPost, followersCount);
    });
  
  
  }
  countVotes(post: any): number {
    const postVotes = post.rating.length;
    return postVotes;
  }

  countVotesForPosts( posts: any[]) {
    posts.forEach(post => {
      const votesCount = this.countVotes(post);
      this.votesCountMap.set(post.idPost, votesCount);
    });
  }

}
