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
        transaction_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'transaction',
                key: 'id'
            }
          }   
        },
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'budget'
}
);

module.exports = Budget;