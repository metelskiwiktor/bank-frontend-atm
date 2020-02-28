import {Component} from '@angular/core';
import {OauthComponent} from './oauth/oauth.component';
import {AccountStorage} from './service/account-storage';
import {HttpClientService} from './service/http-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  accountNumber: string;
  balance: string;

  constructor(public accountStorage: AccountStorage, public ouath: OauthComponent, private httpClientService: HttpClientService) {
    this.httpClientService.getAccountDetails().subscribe(value => {
      this.accountNumber = value.accountNumber;
      this.balance = value.balance;
    });
  }

  title = 'bank-frontend-atm';
}
