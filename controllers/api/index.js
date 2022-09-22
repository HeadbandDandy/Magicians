const router = require('express').Router();


const userRoutes = require('./user-routes');
const budgetRoutes = require('./budget-routes');
const transactionRoutes = require('./transaction-routes');

router.use('/budgets', budgetRoutes);
router.use('/users', userRoutes);
router.use('/transactions', transactionRoutes);

module.exports = router;
