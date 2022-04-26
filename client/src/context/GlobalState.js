import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import AppReducer from './AppReducer';
import apiUrl from '../apiConfig';

const initState = {
    transactions: [],
    error: null,
    loading: true,
    transaction: null
}

//Create context
export const GlobalContext = createContext(initState);

//Provider Component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initState);

    //Actions
    async function getTransactions() {
        try {
            const res = await axios.get(`${apiUrl}/transactions`);
            //console.log(res)
            dispatch({
                type: 'GET_TRANSACTION',
                payload: res.data
            });
            
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete(`${apiUrl}/transactions/${id}`);

            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function addTransaction(transaction) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post(`${apiUrl}/transactions`, transaction, config);

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function updateTransactions(id, transaction) {
        await axios.put(`${apiUrl}/transactions/${id}`, transaction);
        dispatch({
            type: 'UPDATE_TRANSACTIONS'
        });

        const res = await axios.get(`${apiUrl}/transactions`);
            
        dispatch({
            type: 'GET_TRANSACTION',
            payload: res.data
        });
    }

    function updateTransaction(transaction) {
        dispatch({
            type: 'UPDATE_TRANSACTION',
            payload: transaction
        })
    }

    return (
        <GlobalContext.Provider value= {{
            transactions: state.transactions,
            transaction: state.transaction,
            error: state.error,
            loading: state.loading,
            getTransactions,
            deleteTransaction,
            addTransaction,
            updateTransaction,
            updateTransactions
        }}>
            {children}
        </GlobalContext.Provider>
    );
}