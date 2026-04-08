import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Txn } from "../../models/Txn";
import type { TxnsSummary } from "../../models/TxnsSummary";

interface StatementState {
    txns: Txn[];
    summary: TxnsSummary;
    nextId:number;
}

const initialState: StatementState = {
    txns: [
        {
            "id": 1,
            "header": "Salary",
            "txnDate": "2026-01-01",
            "txnType": "CREDIT",
            "amount": 56000
        },
        {
            "id": 2,
            "header": "Rent",
            "txnDate": "2026-01-01",
            "txnType": "DEBIT",
            "amount": 6000
        }
    ],
    summary: { 
        totalCredit: 56000, 
        totalDebit: 6000, 
        balance: 50000 
    },
    nextId:3
};

const StatementSlice = createSlice({
    name: "StatementSlice",
    initialState,
    reducers: {
        addTxn: (state, action: PayloadAction<Txn>) => {
            
            action.payload.id=state.nextId;
            state.txns.push(action.payload);
            state.nextId++;

            if (action.payload.txnType === "CREDIT") {
                state.summary.totalCredit += action.payload.amount;
            } else if (action.payload.txnType === "DEBIT") {
                state.summary.totalDebit += action.payload.amount;
            }
            state.summary.balance = state.summary.totalCredit - state.summary.totalDebit;
        },
        updateTxn: (state, action: PayloadAction<Txn>) => {
            let index = state.txns.findIndex(cx => cx.id === action.payload.id);
            if (index > -1) {
                
                //cancel the txn-amount from the summary as per old-record
                if (state.txns[index].txnType === "CREDIT") {
                    state.summary.totalCredit -= state.txns[index].amount;
                } else if (state.txns[index].txnType === "DEBIT") {
                    state.summary.totalDebit -= state.txns[index].amount;
                }

                //updating the record
                action.payload.isEditable=undefined;
                state.txns[index] = action.payload;

                //update the summary as per new-record
                if (action.payload.txnType === "CREDIT") {
                    state.summary.totalCredit += action.payload.amount;
                } else if (action.payload.txnType === "DEBIT") {
                    state.summary.totalDebit += action.payload.amount;
                }

                state.summary.balance = state.summary.totalCredit - state.summary.totalDebit;                
            }
        },
        deleteTxn: (state, action: PayloadAction<Number>) => {
            let index = state.txns.findIndex(tx => tx.id === action.payload);
            if (index > -1) {
                //cancel the txn-amount from the summary as per old-record
                if (state.txns[index].txnType === "CREDIT") {
                    state.summary.totalCredit -= state.txns[index].amount;
                } else if (state.txns[index].txnType === "DEBIT") {
                    state.summary.totalDebit -= state.txns[index].amount;
                }

                //remove the record
                state.txns.splice(index, 1);

                state.summary.balance = state.summary.totalCredit - state.summary.totalDebit;                
            }
        },
        editTxn: (state, action: PayloadAction<Number>) => {
            let index = state.txns.findIndex(tx => tx.id === action.payload);
            if (index > -1) {
                state.txns[index].isEditable=true;
            }
        },
        unEditTxn: (state, action: PayloadAction<Number>) => {
            let index = state.txns.findIndex(tx => tx.id === action.payload);
            if (index > -1) {
                state.txns[index].isEditable=undefined;
            }
        }
    }
});

const StatementReducer = StatementSlice.reducer;

export const { addTxn, updateTxn, deleteTxn, editTxn, unEditTxn } = StatementSlice.actions;
export default StatementReducer;