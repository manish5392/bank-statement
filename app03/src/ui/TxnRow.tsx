import { useDispatch } from "react-redux";
import type { AppDispatch } from "../lib/state/AppStore";
import type { Txn } from "../models/Txn";
import { deleteTxn, editTxn } from "../lib/state/StatementSlice";

const TxnRow = ({ txn }: {txn: Txn}) => {

    const dispatch : AppDispatch = useDispatch();

    const edit = (id:number) => dispatch(editTxn(id));
    const remove = (id:number) => dispatch(deleteTxn(id));

    return (
        <div className="row p-1 mb-1 border-bottom border-info">
            <div className="col-1 text-end">{txn.id}</div>
            <div className="col-2 text-center">{txn.txnDate}</div>
            <div className="col">{txn.header}</div>
            <div className="col-2 text-end">{txn.txnType === "CREDIT" && txn.amount}</div>
            <div className="col-2 text-end">{txn.txnType === "DEBIT" && txn.amount}</div>
            <div className="col-2 text-center">
                <button type="button" className="btn btn-sm btn-secondary" onClick={_e => edit(txn.id)}>
                    <i className="bi bi-pen" title="EDIT" />
                </button>
                <button className="btn btn-sm btn-danger ms-1" onDoubleClick={_e => remove(txn.id)}>
                    <i className="bi bi-trash" title="double click to DELETE" />
                </button>
            </div>
        </div>
    );
}

export default TxnRow;