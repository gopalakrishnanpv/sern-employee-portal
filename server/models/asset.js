'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Asset.belongsTo(models.Employee)
    }
  }
  Asset.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    SerialNumber: { type: DataTypes.STRING, allowNull: false },
    Make: { type: DataTypes.STRING, allowNull: false },
    Model: { type: DataTypes.STRING, allowNull: false },
    WarrantyStatus: { type: DataTypes.STRING, allowNull: false },
    AssetStatus: { type: DataTypes.STRING, allowNull: false },
    PurchaseDate: { type: DataTypes.DATEONLY, allowNull: false },
    InvoiceNumber: { type: DataTypes.STRING, allowNull: false },
    WarrantyExpirationDate: { type: DataTypes.DATEONLY, allowNull: false },
    AssetType: { type: DataTypes.STRING, allowNull: false },
    HostName: { type: DataTypes.STRING, allowNull: false },
    RequestNumber: { type: DataTypes.STRING, allowNull: false },
    Age: { type: DataTypes.STRING, allowNull: false },
    OperatingSystem: { type: DataTypes.STRING, allowNull: false },
    Processor: { type: DataTypes.STRING, allowNull: false },
    ClockSpeed: { type: DataTypes.STRING, allowNull: false },
    RAM: { type: DataTypes.STRING, allowNull: false },
    EmployeeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Employee',
        key: 'Id'
      }
    },
  }, {
    sequelize,
    modelName: 'Asset',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt'
  });
  return Asset;
};