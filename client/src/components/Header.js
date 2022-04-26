import '../App.css'
import { GlobalProvider } from '../context/GlobalState';
import {Balance} from './Balance';
import {Expenses} from './Expenses';
import {TransactionList} from './TransactionList';
import {AddTransaction} from './AddTransaction';


function Header() {
    return(
        <div className='mainDiv'>
            <div className='title'>
            <h1>Expense Tracker</h1>
            </div>
            <GlobalProvider>
            <div className='display'>
            <div className='expn'>
            <Balance />
            <Expenses />
            </div>
            <div className='transactions'>
            <TransactionList />
            <AddTransaction />
            </div>
            </div>
            </GlobalProvider>
        </div>
    )
}

export default Header