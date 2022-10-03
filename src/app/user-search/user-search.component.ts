import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RepositoryUserService } from '../services/repository-user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  user!: User;
  searchText!: string;
  displayUserDetailContainer = false;
  displayGithubUserErrorNotFound = false;

  constructor(private userservice: RepositoryUserService) { }

  //accessing form inputs
  @ViewChild('f')
  searchForm!: NgForm;
  query: string = '';
  ngOnInit(): void { }

  //search for a github user
  searchGithubUser() {
    this.searchText = this.searchForm.value.search;
    if (!this.userservice.searchHistory.some((q: string) => q === this.searchText)) {
      this.userservice.searchHistory = [...this.userservice.searchHistory, this.searchText];
      console.log(this.userservice.searchHistory)
      this.userservice.setSearchHistory('searchHistory', this.userservice.searchHistory)
    }
    this.userservice.getUserResponse(this.searchText).then(
      (response) => {
        this.user = this.userservice.getUserDetails;
        this.displayUserDetailContainer = true;
      },
      (error) => {
        console.log(error);
        this.displayGithubUserErrorNotFound = true;
      }
    );
  }

}
