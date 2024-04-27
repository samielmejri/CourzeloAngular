export class ArticleModel {
    id?: string ='';
    titre?: string = '';
    category?: string='';
    score? : number =0;
    followedBy?: string[] = [];
}