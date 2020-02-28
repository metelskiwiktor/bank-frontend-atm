import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AccountStorage} from './account-storage';
import {TransactionTransferSelf} from '../model/TransactionTransferSelf';
import {Details} from '../model/Details';
import {Observable} from 'rxjs';
import {Login} from '../model/Login';
import {Client} from '../model/Client';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, private accountStorage: AccountStorage) {
  }

  public createTransactionSelf(transaction: TransactionTransferSelf, operationType: string) {
    transaction.client = Client.ATM;
    const tokenValue = this.accountStorage.getTokenValue();
    return this.httpClient.post('http://localhost:8090/transaction/' + operationType, transaction, {headers: {tokenValue}});
  }

  public login(login: Login) {
    login.client = Client.ATM;
    return this.httpClient.post('http://localhost:8090/oauth/login/credit-card', login, {responseType: 'text'});
  }

  public logout() {
    const tokenValue = this.accountStorage.getTokenValue();
    this.httpClient.get('http://localhost:8090/oauth/logout', {headers: {tokenValue}}).subscribe();
    this.accountStorage.logout();
  }

  public getAccountDetails(): Observable<Details> {
    const tokenValue = this.accountStorage.getTokenValue();
    const http = this.httpClient.get<Details>('http://localhost:8090/account/details', {headers: {tokenValue}});
    http.subscribe(value => {
      this.accountStorage.setAccountDetails(value.balance, value.accountNumber);
    });
    return http;
  }
}
