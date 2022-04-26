const Transaction = require('../models/transaction')

const createTransaction = async (req, res) => {
    try {
        const transaction = await new Transaction(req.body)
        await transaction.save()
        return res.status(201).json(transaction)
    } catch (error) {
       return res.status(500).send(error.message)
    }
}

const getTransaction = async (req, res) => {
    try {
        let transactions = await Transaction.find()
        return res.status(200).json(transactions)
    } catch (error) {
       return res.status(500).send(error.message)
    }
}

const updateTransaction = async (req, res) => {
    try {
        const {id} = req.params;
        Transaction.findByIdAndUpdate(id, req.body, {new: true}, (err, transactions) => {
            if(err){
                res.status(500).send(err)
            }
            if(!transactions){
                res.status(500).send('Transaction not found!')
            }
            return res.status(200).json(transactions)
        })
    } catch (error) {
       return res.status(500).send(error.message)
    }
}
const deleteTransaction = async (req, res) => {
    try {
        const {id} = req.params
        const deleted = await Transaction.findByIdAndDelete(id)
        if(deleted){
            return res.status(200).send('Transaction Deleted')
        }
        throw new Error('Transaction Not Found!')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    
    createTransaction,
    getTransaction,
    updateTransaction,
    deleteTransaction
   
}