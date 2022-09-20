const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Budget extends Model {}

Budget.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        budgetAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        // transaction_text: {
        //     type: DataTypes.STRING,
        //     references: {
        //         model: 'transaction',
        //         key: 'transaction_text'
        //     }
        // }
        },
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'budget'
}
);

module.exports = Budget;