const { Router} = require('express')
const controllers = require('../controllers/transactions')
const router = Router()

router.get('/', (req, res) => res.send('This is the root!'))

router.post('/transactions', controllers.createTransaction)
router.get('/transactions', controllers.getTransaction)
router.put('/transactions/:id', controllers.updateTransaction)
router.delete('/transactions/:id', controllers.deleteTransaction)

module.exports = router;