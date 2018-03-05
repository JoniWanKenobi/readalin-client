import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { RequireAnonGuardService } from './services/require-anon-guard.service';
import { RequireUserGuardService } from './services/require-user-guard.service';
import { BooksService } from './services/books.service';


import { AppComponent } from './app.component';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { BooksComponent } from './pages/books/books.component';

import { HomepageLeftComponent } from './components/homepage-left/homepage-left.component';
import { HomepageRightComponent } from './components/homepage-right/homepage-right.component';
import { HomepageFeaturesComponent } from './components/homepage-features/homepage-features.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
// import { BookComponent } from './components/book/book.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { SearchComponent } from './components/search/search.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BookPageComponent } from './pages/book-page/book-page.component';
import { WcloudComponent } from './components/wcloud/wcloud.component';
import { FiltersComponent } from './components/filters/filters.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomepageComponent, canActivate: [ RequireAnonGuardService ] },
  { path: 'books/:id', component: BooksComponent, canActivate: [RequireUserGuardService] },
  { path: 'book/:id', component: BookPageComponent, canActivate: [RequireUserGuardService],
    children: [
      { path: '', redirectTo: 'flyover', pathMatch: 'full' },
      { path: 'flyover', component: WcloudComponent }
    ]
}
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
    // BookComponent,
    BooksListComponent,
    SearchComponent,
    FileUploadComponent,
    NavbarComponent,
    BookPageComponent,
    WcloudComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, RequireAnonGuardService, RequireUserGuardService, BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
