'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BloodGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BloodGroup.hasMany(models.Employee, {
        onDelete: 'NO ACTION',
      })
    }
  }
  BloodGroup.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.STRING, allowNull: false },
  }, {
    sequelize,
    modelName: 'BloodGroup',
    timestamps: false,
    freezeTableName: true,
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt',
  });
  return BloodGroup;
};