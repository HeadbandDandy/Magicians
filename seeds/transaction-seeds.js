const { Transaction } = require('../models');

const transactiondata = [
    {
        transaction_text: 'Gas',
        transaction_amount: 100
    }
];

const seedTransaction = () => Transaction.bulkCreate(transactiondata);

module.exports = seedTransaction;