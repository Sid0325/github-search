import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Repository } from '../helpers/repository';
import { User } from '../user';
// import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment';
// import { Repository } from './repository';
// import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class RepositoryUserService {
  // getUserDetails: User;
  // getRepositoryDetails: Repository;
  getUserDetails: any;
  getRepositoryDetails: any;
  environment = {
    apiUrl: 'https://api.github.com/users',
    apiKey: ''
  }
  searchHistory: any = [];


  constructor(private http: HttpClient) {
    this.getUserDetails = new User(
      '',
      '',
      '',
      '',
      '',
      '',
      0,
      0,
      0,
      new Date(),
    );
    this.getRepositoryDetails = new Repository(
      '',
      '',
      '',
      new Date(),
      '',
    )
  }
  private user = new BehaviorSubject<string>('john');
  castUser = this.user.asObservable();
  

  setSearchHistory(key: string, value: any[]) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getSearchHistory(key: string) {
    let data = localStorage.getItem(key);
    return JSON.parse(data || '')
  }

  editUser(newUser: string){
    this.user.next(newUser); 
  }
  //getting user details from api
  getUserResponse(githubUsername: string): Promise<void> {
    interface ApiUserResponse {
      name: string,
      login: string,
      avatar_url: string,
      html_url: string,
      location: string,
      bio: string,
      public_repos: number,
      followers: number,
      following: number,
      created_at: Date,
    }

    let userPromise = new Promise<void>((resolve, reject) =>
      this.http
        .get<ApiUserResponse>(
          this.environment.apiUrl +
          '/' +
          githubUsername
        )
        .toPromise()
        .then(
          (response) => {
            this.getUserDetails = response;
            resolve();
          },
          (error) => {
            reject(error);
            console.log(error);
          }
        )
    );
    return userPromise;
  }

  //getting repository details
  getRepositoryResponse(githubUsername: string) {
    interface ApiRepositoryResponse {
      name: string;
      html_url: string;
      description: string;
      created_at: Date;
      language: string;
    }

    let repositoryPromise = new Promise<void>((resolve, reject) => {
      this.http
        .get<ApiRepositoryResponse>(
          this.environment.apiUrl +
          '/' +
          githubUsername +
          '/repos?sort=created&direction=asc'
        )
        .toPromise()
        .then(
          (response) => {
            this.getRepositoryDetails = response;
            resolve();
          },
          (error) => {
            reject(error);
            console.log(error);
          }
        );
    });
    return repositoryPromise;
  }
}
