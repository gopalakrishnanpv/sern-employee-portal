'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Department.hasMany(models.Role, {
        onDelete: 'NO ACTION',
      })
      Department.hasMany(models.Employee, {
        onDelete: 'NO ACTION',
      })
    }
  }
  Department.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.STRING, allowNull: false },
  }, {
    sequelize,
    modelName: 'Department',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt'

  });
  return Department;
};