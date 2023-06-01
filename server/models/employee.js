'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.belongsTo(models.Department)
      Employee.belongsTo(models.Role)
      Employee.belongsTo(models.Gender)
      Employee.belongsTo(models.BloodGroup)
      Employee.belongsTo(models.MaritalStatus)
      Employee.hasMany(models.Asset, {
        onDelete: 'NO ACTION',
      })
    }
  }
  Employee.init({
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    EmployeeId: { type: DataTypes.STRING, allowNull: false },
    Name: { type: DataTypes.STRING, allowNull: false },
    UserName: { type: DataTypes.STRING, allowNull: false },
    FatherName: { type: DataTypes.STRING, allowNull: false },
    MotherName: { type: DataTypes.STRING, allowNull: false },
    DateOfBirth: { type: DataTypes.DATEONLY, allowNull: false },
    DateOfJoining: { type: DataTypes.DATEONLY, allowNull: false },
    EmailId: { type: DataTypes.STRING, allowNull: false },
    MobileNumber: { type: DataTypes.STRING, allowNull: false },
    Education: { type: DataTypes.STRING, allowNull: false },
    RoleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Role',
        key: 'Id'
      }
    },
    DepartmentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Department',
        key: 'Id'
      }
    },
    GenderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Gender',
        key: 'Id'
      }
    },
    BloodGroupId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'BloodGroup',
        key: 'Id'
      }
    },
    MaritalStatusId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'MaritalStatus',
        key: 'Id'
      }
    },
  }, {
    sequelize,
    modelName: 'Employee',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt'
  });
  return Employee;
};