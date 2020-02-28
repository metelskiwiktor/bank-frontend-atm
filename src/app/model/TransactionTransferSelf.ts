import {Client} from './Client';

export class TransactionTransferSelf {
  public amount: string;
  public senderAccountNumber: string;
  public senderBalance: string;
  public client: Client;
}
