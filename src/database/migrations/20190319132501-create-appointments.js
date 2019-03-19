"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("appointments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        //se o id do usuário mudar na tabela de usuários, nessa tabela também vai mudar
        onUpdate: "CASCADE",
        //se o id do usuário for deletado, o registro nesta tabela também será deletado
        onDelete: "CASCADE",
        allowNull: false
      },
      provider_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        //se o id do usuário mudar na tabela de usuários, nessa tabela também vai mudar
        onUpdate: "CASCADE",
        //se o id do usuário for deletado, o registro nesta tabela também será deletado
        onDelete: "CASCADE",
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("appointments");
  }
};
