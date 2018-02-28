import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { RequireAnonGuardService } from './services/require-anon-guard.service';
import { RequireUserGuardService } from './services/require-user-guard.service';


import { AppComponent } from './app.component';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { BooksComponent } from './pages/books/books.component';

import { HomepageLeftComponent } from './components/homepage-left/homepage-left.component';
import { HomepageRightComponent } from './components/homepage-right/homepage-right.component';
import { HomepageFeaturesComponent } from './components/homepage-features/homepage-features.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomepageComponent, canActivate: [ RequireAnonGuardService ] },
  { path: 'books', component: BooksComponent, canActivate: [RequireUserGuardService] }
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
    SignupFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, RequireAnonGuardService, RequireUserGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
