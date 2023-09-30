import { Component } from '@angular/core';

@Component({
  selector: 'news-filter',
  templateUrl: './news-filter.component.html',
  styleUrls: ['./news-filter.component.scss']
})
export class NewsFilterComponent {
  newsFilter: string = 'search'

  onChangeFilter(ev: Event){
    this.newsFilter = (<HTMLInputElement>ev.target).value
  }
}
