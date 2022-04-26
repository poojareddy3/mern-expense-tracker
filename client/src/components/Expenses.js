import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const Expenses = () => {
    const { transactions } = useContext(GlobalContext);

    const amounts = transactions.map(transaction => transaction.amount);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        -1
    ).toFixed(2);

    return (
        <div className="exp-container">
            <div className="income">
              <h4>Income
              <p>+${numberWithCommas(income)}</p></h4>
            </div>
            <div className="expense" >
               <h4>Expense</h4>
                <p>-${numberWithCommas(expense)}</p>
            </div>
        </div>
    )
}