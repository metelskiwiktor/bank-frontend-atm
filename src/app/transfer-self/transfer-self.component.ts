import {Component, NgZone, OnInit} from '@angular/core';
import {Client} from '../model/Client';
import {AccountStorage} from '../service/account-storage';
import {HttpClientService} from '../service/http-client.service';
import {TransactionTransferSelf} from '../model/TransactionTransferSelf';
import {Router} from '@angular/router';

@Component({
  selector: 'app-transfer-self',
  templateUrl: './transfer-self.component.html',
  styleUrls: ['./transfer-self.component.css']
})
export class TransferSelfComponent implements OnInit {
  transferSelf: TransactionTransferSelf = new TransactionTransferSelf();
  operationChoice: string;

  constructor(private httpClientService: HttpClientService, private accountStorage: AccountStorage, public router: Router, private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.httpClientService.getAccountDetails();
  }

  createTransaction() {
    this.transferSelf.senderAccountNumber = this.accountStorage.getAccountNumber();
    this.transferSelf.senderBalance = this.accountStorage.getBalance();
    this.httpClientService.createTransactionSelf(this.transferSelf, this.operationChoice).toPromise().then(value => {
      this.httpClientService.getAccountDetails();
      this.ngZone.run(() => this.router.navigate(['/']));
    }).catch(reason => {
      alert(reason.toString());
      console.log(reason.toString());
      console.log(reason);
      console.log(reason.toLocaleString());
    });
  }

}
