import { Component, OnInit } from '@angular/core';
import { DenominationStack } from 'projects/models/src/lib/inteface/denomination-stack';
import { TransactionHistory } from 'projects/models/src/lib/inteface/transaction-history';
import { DenominationStackService } from 'projects/services/src/lib/denomination-stack.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  denominationCoulmns: string[] = ['Denomination', 'Bills', 'Total'];
  transactionCoulmns: string[] = ['transactionType', 'amount', 'status', 'message'];
  denominationStacks: any[] = [];
  transactions: TransactionHistory[] = [];

  constructor(private denominationStackService: DenominationStackService) {

    this.denominationStackService.denominationStacks.subscribe((denominationStacks) => {
      this.denominationStacks = denominationStacks;
      this.denominationStacks.forEach(async (denominationStack) => {
        denominationStack.Denomination = `$${denominationStack.denomination}`;
        denominationStack.Bills = denominationStack.count;
        denominationStack.Total = denominationStack.count * denominationStack.denomination;
      });
    });

    this.denominationStackService.transactionHistory.subscribe((transactions) => {
      this.transactions = transactions;
    });

  }

  getTotal() {
    return this.denominationStacks.map(denominationStack => denominationStack.Total).reduce((acc, value) => acc + value, 0);
  }

  ngOnInit(): void {
  }

}
