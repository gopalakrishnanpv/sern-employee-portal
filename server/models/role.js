'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.belongsTo(models.Department)
      Role.hasMany(models.Employee, {
        onDelete: 'NO ACTION',
      })
    }
  }
  Role.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.STRING, allowNull: false },
    DepartmentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Department',
        key: 'Id'
      }
    },
  }, {
    sequelize,
    modelName: 'Role',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt'

  });
  return Role;
};