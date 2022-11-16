import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DenominationStackService } from 'projects/services/src/lib/denomination-stack.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements AfterViewInit {

  @ViewChild('withdrawAmount') withdrawAmountField !: MatInput;

  error: string = '';

  readonly withdrawalForm = new FormGroup({
    withdrawAmount: new FormControl<number>(0, Validators.required)
  });

  constructor(private snackBar: MatSnackBar, private denominationStackService: DenominationStackService) { }

  ngAfterViewInit(): void {
    this.withdrawAmountField.focus();
  }

  submit() {
    if (this.withdrawalForm.valid) {
      debugger;
      const withdrawAmount: number = this.withdrawalForm.value.withdrawAmount ? this.withdrawalForm.value.withdrawAmount : 0;
      if (withdrawAmount > 0) {
        let res = this.denominationStackService.withdraw(withdrawAmount);
        if (res === false) {
          this.error = "Insufficient Funds, Please try after sometime.";
          return;
        }
        else {
          this.error = "";
          this.withdrawAmountField.focus();
          this.snackBar.open("Withdrawal successfully!", "ok", {
            verticalPosition: "top",
          });
          return;
        }
      }

    }

    this.withdrawAmountField.focus();
    this.error = "Please enter valid amount!";
  }

  reset() {
    this.error = '';
    this.withdrawalForm.value.withdrawAmount = 0;
  }

}
