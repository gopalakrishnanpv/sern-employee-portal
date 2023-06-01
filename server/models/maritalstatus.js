'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MaritalStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MaritalStatus.hasMany(models.Employee, {
        onDelete: 'NO ACTION',
      })
    }
  }
  MaritalStatus.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.STRING, allowNull: false },
  }, {
    sequelize,
    modelName: 'MaritalStatus',
    timestamps: false,
    freezeTableName: true,
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt',
  });
  return MaritalStatus;
};