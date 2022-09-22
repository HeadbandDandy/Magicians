const { Budget } = require('../models');

const budgetdata = [
    {
        budgetname: 'main'
    }
];

const seedBudget = () => Budget.bulkCreate(budgetdata);

module.exports = seedBudget;