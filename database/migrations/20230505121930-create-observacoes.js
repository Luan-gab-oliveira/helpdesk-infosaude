'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('observacoes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      chamado_id:{
        type: Sequelize.INTEGER,
        references: { model: 'chamados', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      obs:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      user:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
    });    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('observacoes');
  }
};
