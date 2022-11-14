import { Injectable } from '@angular/core';
import { Denomination } from 'projects/models/src/lib/enum/denomination.enum';
import { DenominationStack } from 'projects/models/src/lib/inteface/denomination-stack';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DenominationStackService {

readonly _denominationStacks : DenominationStack[] = [ 
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

private _denominationStacksSubject : BehaviorSubject<DenominationStack[]> = new BehaviorSubject(this._denominationStacks);
public denominationStacks: Observable<DenominationStack[]> = this._denominationStacksSubject.asObservable(); 


reStock(denomination:Denomination,count:number):boolean
{
    let denomiNationStack = this._denominationStacks.find(x=>x.denomination === denomination);
    if(denomiNationStack)
    {
      denomiNationStack.count = denomiNationStack.count + count;
      this._denominationStacksSubject.next(this._denominationStacks);
      return true;
    }
    return false;
    
}

withdraw(amount:number) : boolean
{
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
      return true;
    }
    return false;
}

}
