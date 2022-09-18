

const { Budget } = require('../models');

const budgetdata = [
    {
        transaction_id: 1,
    }
];

const seedBudget = () => Budget.bulkCreate(budgetdata);

module.exports = seedBudget;