import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './cmps/app/app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './cmps/nav-bar/nav-bar.component';
import { NewsFilterComponent } from './cmps/news-filter/news-filter.component';
import { NewsListComponent } from './cmps/news-list/news-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    NewsFilterComponent,
    NewsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
