'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('MaritalStatus',
      [
        { Name: "Single" },
        { Name: "Married" },
        { Name: "Divorced" },
        { Name: "Complicated" },
        { Name: "Prefer not to say" },
      ]
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('MaritalStatus', null, {});
  }
};
