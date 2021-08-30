import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { FooterComponent } from './footer/footer.component';
import { StarRepositoryDirective } from './star-repository.directive';
import { UserSearchComponent } from './user-search/user-search.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainpageComponent,
    FooterComponent,
    StarRepositoryDirective,
    UserSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
