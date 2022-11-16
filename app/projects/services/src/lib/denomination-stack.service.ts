import { Injectable } from '@angular/core';
import { Denomination } from 'projects/models/src/lib/enum/denomination.enum';
import { Status } from 'projects/models/src/lib/enum/status.enum';
import { TransactionType } from 'projects/models/src/lib/enum/transaction-type.enum';
import { DenominationStack } from 'projects/models/src/lib/inteface/denomination-stack';
import { TransactionHistory } from 'projects/models/src/lib/inteface/transaction-history';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DenominationStackService {

private readonly _denominationStacks : DenominationStack[] = [ 
  {
    denomination : Denomination.Hundred,
    count : 10
  },
  {
    denomination : Denomination.Fifty,
    count : 10
  },
  {
    denomination : Denomination.Twenty,
    count : 10
  },
  {
    denomination : Denomination.Ten,
    count : 10
  },
  {
    denomination : Denomination.Five,
    count : 10
  },
  {
    denomination : Denomination.One,
    count : 10
  },
]

private readonly _transactionHistory : TransactionHistory[] = [];
private _transactionHistorySubject : BehaviorSubject<TransactionHistory[]> = new BehaviorSubject(this._transactionHistory)
private _denominationStacksSubject : BehaviorSubject<DenominationStack[]> = new BehaviorSubject(this._denominationStacks);

public denominationStacks: Observable<DenominationStack[]> = this._denominationStacksSubject.asObservable(); 
public transactionHistory: Observable<TransactionHistory[]>  = this._transactionHistorySubject.asObservable();

reStock(denomination:Denomination,count:number):boolean
{
    let denomiNationStack = this._denominationStacks.find(x=>x.denomination === denomination);
    if(denomiNationStack)
    {
      denomiNationStack.count = denomiNationStack.count + count;
      this._denominationStacksSubject.next(this._denominationStacks);
      
      this._addTransaction([denomiNationStack],TransactionType.Restock,count * denomiNationStack.denomination, Status.Success);

      return true;
    }
    this._addTransaction([],TransactionType.Restock,count * denomination, Status.Failure, `${denomiNationStack} $ bills restock failure`);
    return false;
    
}

withdraw(amount:number) : boolean
{
    const refAmount = amount;
    let denominationsWithdrawble : DenominationStack[] = [];
    this._denominationStacks.forEach(denominationStacks => {
      let denaminationWithdrawable = Math.floor(amount/denominationStacks.denomination);
      if(denaminationWithdrawable > denominationStacks.count)
      {
        denaminationWithdrawable = denominationStacks.count;
      }
      denominationsWithdrawble.push({
        denomination: denominationStacks.denomination,
        count: denaminationWithdrawable
      });

      amount = amount - (denominationStacks.denomination * denaminationWithdrawable);

    });

    if(amount === 0)
    {
      denominationsWithdrawble.forEach(denominationWithdrawble=>{
          let denominationStack = this._denominationStacks.find(x=>x.denomination === denominationWithdrawble.denomination);
          if(denominationStack)
          {
            denominationStack.count = denominationStack.count -  denominationWithdrawble.count;
          }
      });
      this._addTransaction(denominationsWithdrawble,TransactionType.Withdrawl,refAmount, Status.Success);
      return true;
    }
    this._addTransaction([],TransactionType.Withdrawl,refAmount, Status.Failure, `$${refAmount} withdrawl failed, Insufficient funds.`);
    return false;
}

private _addTransaction(denominations:DenominationStack[], transactionType : TransactionType, amount: number , status: Status, message : string = ''):void
{
  this._transactionHistory.push({
    denominations : denominations,
    transactionType: transactionType,
    amount: amount,
    status: status,
    message: message
  });

  this._transactionHistorySubject.next(this._transactionHistory);
}

}
