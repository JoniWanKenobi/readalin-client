import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { BooksComponent } from './pages/books/books.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomepageComponent },
  { path: 'books', component: BooksComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BooksComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
