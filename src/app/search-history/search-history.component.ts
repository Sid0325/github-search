import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepositoryUserService } from '../services/repository-user.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {
  historyData = []
  constructor(private userservice: RepositoryUserService, private router: Router) { }

  ngOnInit() {
    this.historyData = this.userservice.getSearchHistory('searchHistory')
    console.log(this.historyData)
  }

  clearHistory() {
    this.historyData = []
    localStorage.clear()
  }
  redirect(user: string) {
    this.userservice.editUser(user);
    this.router.navigate(['/main']);
  }

}