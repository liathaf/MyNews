import { Component, OnDestroy, OnInit } from '@angular/core';

import { NewsService } from '../../services/news.service'
import { Article } from '../../interfaces/article.interface'
import { Subscription } from 'rxjs';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NewsService]
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private NewsService: NewsService) { }

  articles: Article[] = []
  subscriptions: Subscription[] = []

  ngOnInit() {
    // const newsLoadingSub = this.NewsService.loadNews().subscribe({ next: (articles) => { }, error: (err) => console.log(err) });
    // this.subscriptions.push(newsLoadingSub);
    // const getArticalsSub = this.NewsService.articles$.subscribe((articles) => this.articles = [...articles])
    // this.subscriptions.push(getArticalsSub);

    this.NewsService.loadNews()
    this.NewsService.articles$.subscribe((articals)=>{
      this.articles = articals
    })
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
