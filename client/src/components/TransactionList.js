import React, { useContext, useEffect } from 'react';
import { Transaction } from './Transaction';
import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
    const { transactions, getTransactions } = useContext(GlobalContext);

    useEffect(() => {
        getTransactions();
    },[]);

    return (
       <div className='history'>
            <h3>History</h3>
            <ul id="list" className="list">
                {transactions.map(transaction => (<Transaction key={transaction._id} transaction={transaction} />))}
            </ul>
       </div>
    )
}