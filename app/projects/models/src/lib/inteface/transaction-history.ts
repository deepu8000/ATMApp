import { Status } from "../enum/status.enum";
import { TransactionType } from "../enum/transaction-type.enum";
import { DenominationStack } from "./denomination-stack";

export interface TransactionHistory {
    transactionType: TransactionType;
    denominations: DenominationStack[];
    amount: number;
    status: Status;
    message: string;

}
