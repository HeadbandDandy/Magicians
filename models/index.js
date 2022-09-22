//models requiring class modules need to be placed here

// A USER class can be created that deals with sign-up, login, logout functions.

const Budget = require('./Budget');
const Transaction = require('./Transaction');
const User = require('./User')

Budget.hasMany(Transaction, {
    foreignKey: 'budget_id'
});

Transaction.belongsTo(Budget, {
    foreignKey: 'budget_id',
    onDelete: 'SET NULL'
});

User.hasMany(Budget, {
    foreignKey: 'user_id'
});

Transaction.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Transaction, {
    foreignKey: 'user_id'
});

Budget.belongsTo(User, {
    foreignKey: 'user_id'
});



module.exports = { Budget, Transaction, User};