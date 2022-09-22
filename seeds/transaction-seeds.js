const { Transaction, Budget } = require('../models');

const transactiondata = [
    {
        transaction_text: 'Gas',
        transaction_amount: 100,
        budget_id: 1

    }
];

const seedTransaction = () => Transaction.bulkCreate(transactiondata);

module.exports = seedTransaction;