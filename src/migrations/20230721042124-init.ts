'use strict';
import {QueryInterface, Sequelize, DataTypes} from 'sequelize'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, sequelize: Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('user', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      groupId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'group_id',
      },
      startedDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'started_date',
      },
      positionId: {
        type: DataTypes.TINYINT,
        allowNull: false,
        field: 'position_id',
      },
      createdDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'created_date',
      },
      updatedDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'updated_date',
      },
      deletedDate: {
        type: DataTypes.DATEONLY,
        field: 'deleted_date',
      },
    });
    await queryInterface.createTable('group', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      note: {
        type: DataTypes.TEXT,
      },
      groupLeaderId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'group_leader_id',
      },
      groupFloorNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'group_floor_number',
      },
      createdDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'created_date',
      },
      updatedDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'updated_date',
      },
      deletedDate: {
        type: DataTypes.DATEONLY,
        field: 'deleted_date',
      },
    });
  },

  async down(queryInterface: QueryInterface, sequelize: Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('user');
    await queryInterface.dropTable('group');
  },
};
