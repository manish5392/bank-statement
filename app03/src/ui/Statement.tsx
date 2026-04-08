import type { Txn } from "../models/Txn";
import TxnsHeader from "./TxnsHeader";
import TxnRow from "./TxnRow";
import TxnsFooter from "./TxnsFooter";
import TxnForm from "./TxnForm";
import { useSelector } from "react-redux";
import type { RootState } from "../lib/state/AppStore";

const Statement = () => {

    const txns : Txn[] = useSelector((state:RootState) => state.statement.txns);
    
    return (
        <section className="col-sm-10 m-2 mx-auto p-2">
            <h3>Statement</h3>

            <TxnsHeader />
            <TxnForm />
            {
                txns && txns.length > 0 && (
                    txns.map(t => t.isEditable ?
                        <TxnForm key={t.id} t={t} /> :
                        <TxnRow key={t.id} txn={t} />)
                )
            }
            <TxnsFooter />
        </section>
    )
}

export default Statement;