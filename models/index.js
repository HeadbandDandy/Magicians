//models requiring class modules need to be placed here

// A USER class can be created that deals with sign-up, login, logout functions.



const Budget = require('./Budget');
const Transaction = require('./Transaction');

Budget.hasMany(Transaction, {
    foreignKey: 'budget_id'
});

module.exports = { Budget, Transaction };