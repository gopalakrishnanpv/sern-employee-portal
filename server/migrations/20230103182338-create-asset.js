'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Asset', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SerialNumber: { type: Sequelize.STRING, allowNull: false },
      Make: { type: Sequelize.STRING, allowNull: false },
      Model: { type: Sequelize.STRING, allowNull: false },
      WarrantyStatus: { type: Sequelize.STRING, allowNull: false },
      AssetStatus: { type: Sequelize.STRING, allowNull: false },
      PurchaseDate: { type: Sequelize.DATEONLY, allowNull: false },
      InvoiceNumber: { type: Sequelize.STRING, allowNull: false },
      WarrantyExpirationDate: { type: Sequelize.DATEONLY, allowNull: false },
      AssetType: { type: Sequelize.STRING, allowNull: false },
      HostName: { type: Sequelize.STRING, allowNull: false },
      RequestNumber: { type: Sequelize.STRING, allowNull: false },
      Age: { type: Sequelize.STRING, allowNull: false },
      OperatingSystem: { type: Sequelize.STRING, allowNull: false },
      Processor: { type: Sequelize.STRING, allowNull: false },
      ClockSpeed: { type: Sequelize.STRING, allowNull: false },
      RAM: { type: Sequelize.STRING, allowNull: false },
      EmployeeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Employee',
          key: 'Id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Asset');
  }
};