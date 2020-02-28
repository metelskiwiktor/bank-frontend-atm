import {Component, Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClientService} from '../service/http-client.service';
import {Login} from '../model/Login';
import {AccountStorage} from '../service/account-storage';

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class OauthComponent implements OnInit {
  user: Login = new Login();

  constructor(private httpClientService: HttpClientService, public route: Router, private accountStorage: AccountStorage) {
  }

  ngOnInit(): void {
  }

  login() {
    this.httpClientService.login(this.user).subscribe(value => {
      this.accountStorage.setTokenValue(value);
      this.httpClientService.getAccountDetails().subscribe(data => {
        this.route.navigateByUrl('/');
      });
    });
  }

  logout() {
    this.httpClientService.logout();
    this.route.navigateByUrl('/');
  }
}
