'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('chamados', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id:{
        type: Sequelize.INTEGER,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      nome:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      local:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefone:{
        type: Sequelize.STRING,
        allowNull:true,
      },
      ocorrencia:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      status:{
        type: Sequelize.STRING,
        defaultValue: 'pendente',
        allowNull: false

      },
      atendimento:{
        type: Sequelize.STRING,
        defaultValue: 'local',
        allowNull: false
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
    await queryInterface.dropTable('chamados');
  }
};
