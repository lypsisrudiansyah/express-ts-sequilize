'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const result = await queryInterface.sequelize.query("SELECT name FROM sqlite_master WHERE type='table'");
    console.log(result[0]); // Logs all table names

    await queryInterface.addColumn('tasks', 'image', {
      type: Sequelize.STRING(128),
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tasks', 'image');
  }
};