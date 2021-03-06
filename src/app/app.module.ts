import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { RequireAnonGuardService } from './services/require-anon-guard.service';
import { RequireUserGuardService } from './services/require-user-guard.service';
import { BooksService } from './services/books.service';
import { D3DirectedGraphService } from './services/d3-directed-graph.service';


import { AppComponent } from './app.component';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { BooksComponent } from './pages/books/books.component';
import { BookPageComponent } from './pages/book-page/book-page.component';

import { HomepageLeftComponent } from './components/homepage-left/homepage-left.component';
import { HomepageRightComponent } from './components/homepage-right/homepage-right.component';
import { HomepageFeaturesComponent } from './components/homepage-features/homepage-features.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { BookComponent } from './components/book/book.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { SearchComponent } from './components/search/search.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ForceDirectedWordcloudComponent } from './components/force-directed-wordcloud/force-directed-wordcloud.component';
import { WordDetailsGraphComponent } from './components/word-details-graph/word-details-graph.component';
import { SentencesListComponent } from './components/sentences-list/sentences-list.component';
import { WordsListComponent } from './components/words-list/words-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomepageComponent, canActivate: [ RequireAnonGuardService ] },
  { path: 'books/:id', component: BooksComponent, canActivate: [RequireUserGuardService] },
  { path: 'book/:id', component: BookPageComponent, canActivate: [RequireUserGuardService]}
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BooksComponent,
    HomepageLeftComponent,
    HomepageRightComponent,
    HomepageFeaturesComponent,
    LoginFormComponent,
    SignupFormComponent,
    BookComponent,
    BooksListComponent,
    SearchComponent,
    FileUploadComponent,
    NavbarComponent,
    BookPageComponent,
    FiltersComponent,
    ForceDirectedWordcloudComponent,
    WordDetailsGraphComponent,
    SentencesListComponent,
    WordsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService, 
    RequireAnonGuardService, 
    RequireUserGuardService, 
    BooksService,
    D3DirectedGraphService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
