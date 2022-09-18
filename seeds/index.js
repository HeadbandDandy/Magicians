// this file should contain the modules needed to seed data into our tables
// userid; password; username; email; transaction name/id/text/date; asset name/id/text/date



const seedBudget = require('./budget-seeds');
const seedTransaction = require('./transaction-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('-------------');
    await seedBudget();
    console.log('-------------');

    await seedTransaction();
    console.log('-------------');

    process.exit(0);
};

seedAll();