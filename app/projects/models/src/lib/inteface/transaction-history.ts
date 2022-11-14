import { Denomination } from "../enum/denomination.enum";
import { Status } from "../enum/status.enum";
import { TransactionType } from "../enum/transaction-type.enum";

export interface TransactionHistory {
    transactionType: TransactionType;
    denominations: Denomination[];
    amount: number;
    status: Status;
    message: string;

}
