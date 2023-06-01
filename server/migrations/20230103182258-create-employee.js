'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employee', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      EmployeeId: { type: Sequelize.STRING, allowNull: false },
      Name: { type: Sequelize.STRING, allowNull: false },
      UserName: { type: Sequelize.STRING, allowNull: false },
      FatherName: { type: Sequelize.STRING, allowNull: false },
      MotherName: { type: Sequelize.STRING, allowNull: false },
      DateOfBirth: { type: Sequelize.DATEONLY, allowNull: false },
      DateOfJoining: { type: Sequelize.DATEONLY, allowNull: false },
      EmailId: { type: Sequelize.STRING, allowNull: false },
      MobileNumber: { type: Sequelize.STRING, allowNull: false },
      Education: { type: Sequelize.STRING, allowNull: false },
      Gender: { type: Sequelize.STRING, allowNull: false },
      MaritalStatus: { type: Sequelize.STRING, allowNull: false },
      BloodGroup: { type: Sequelize.STRING, allowNull: false },
      RoleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Role',
          key: 'Id'
        }
      },
      DepartmentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Department',
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
    await queryInterface.dropTable('Employee');
  }
};