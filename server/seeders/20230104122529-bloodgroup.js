'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('BloodGroup',
      [
        { Name: "O+" },
        { Name: "O-" },
        { Name: "A+" },
        { Name: "A-" },
        { Name: "B+" },
        { Name: "B-" },
        { Name: "AB+" },
        { Name: "AB-" },
        { Name: "Prefer not to say" },
      ]
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('BloodGroup', null, {});
  }
};
