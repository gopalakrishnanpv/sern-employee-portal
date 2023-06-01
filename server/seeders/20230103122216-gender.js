'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Gender',
      [
        { Name: "Male" },
        { Name: "Female" },
        { Name: "Transgender" },
        { Name: "Prefer not to say" },
      ]
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Gender', null, {});
  }
};
