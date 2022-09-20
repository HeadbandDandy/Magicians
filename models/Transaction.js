const {  DataTypes, Model } = require("sequelize");
const sequelize = require('../config/connection');


class Transaction extends Model {}

Transaction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        transaction_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        transaction_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        budget_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'budget',
                key: 'id'
            }
        },
            // budget_title: {
            //     type: DataTypes.INTEGER,
            //     references: {
            //         model: 'budget',
            //         key: 'title'
            //     }
        // },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'transaction'
    }
);

module.exports = Transaction;