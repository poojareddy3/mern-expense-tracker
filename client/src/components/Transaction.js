import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';
import Icon from '@mui/material/Icon';

export const Transaction = ({ transaction }) => {
    const { deleteTransaction, updateTransaction } = useContext(GlobalContext);

    const sign = transaction.amount < 0 ? '-' : '+';

    const click = (id, text, amount) => {
        const update = {
            id,
            text,
            amount: +amount
        };

        updateTransaction(update);
    }

    return (
        <div className='displayList'>
        <div className={transaction.amount < 0 ? "minus" : "plus"}>
            <div className="out" onClick={() => click(transaction._id, transaction.text, transaction.amount)}>{transaction.text} <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{sign}${numberWithCommas(Math.abs(transaction.amount))}</span>
            <button className="delete-btn" onClick={() => deleteTransaction(transaction._id)}>X</button>
            </div>
        </div>
        </div>
    )
}