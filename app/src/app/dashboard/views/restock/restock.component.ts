import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DenominationStack } from 'projects/models/src/lib/inteface/denomination-stack';
import { DenominationStackService } from 'projects/services/src/lib/denomination-stack.service';

@Component({
  selector: 'app-restock',
  templateUrl: './restock.component.html',
  styleUrls: ['./restock.component.scss']
})
export class RestockComponent implements AfterViewInit {

  @ViewChild('denomination') denominationField !: MatInput;
  @ViewChild('bills') billsField !: MatSelect;

  denominationStacks: DenominationStack[] = [];

  error: string = '';
  
  readonly restockForm = new FormGroup({
    denomination: new FormControl<DenominationStack | null>(null, Validators.required),
    bills : new FormControl<number>(0, Validators.required)
  });

  constructor(private snackBar: MatSnackBar, private denominationStackService: DenominationStackService) { 
    this.denominationStackService.denominationStacks.subscribe((denominationStacks) => {
      this.denominationStacks = denominationStacks;
    });
    
  }

  ngAfterViewInit(): void {
    this.denominationField.focus();
  }

  submit() {
    if (this.restockForm.valid) {
      debugger;
      const bills: number = this.restockForm.value.bills ? this.restockForm.value.bills : 0;
      const denomination : DenominationStack =this.restockForm.value.denomination ? this.restockForm.value.denomination : this.denominationStacks[0];
      
      if (bills > 0) {
        let res = this.denominationStackService.reStock(denomination.denomination,bills);
        if (res === false) {
          this.error = "Restock failed.";
          return;
        }
        else {
          this.error = "";
          this.restockForm.reset();
          this.denominationField.focus();
          this.snackBar.open("Restock successfully!", "ok", {
            verticalPosition: "top",
          });
          return;
        }
      }

    }

    if(!this.restockForm.value.bills || this.restockForm.value.bills === 0)
    {
      this.error = "Invalid bills count!";
      this.billsField.focus();
    }

    if(!this.restockForm.value.denomination)
    {
      this.error = "Please select denomination!";
      this.denominationField.focus();
    }       
  }

  reset() {
    this.restockForm.reset();
    this.error = '';
    this.denominationField.focus();
    
  }

}
