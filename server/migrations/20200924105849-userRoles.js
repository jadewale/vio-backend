
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('UserAccessLevels', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    create_asset: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      description: 'Boolean indicating user access to create assets',
    }
  }),

  down: (queryInterface) => queryInterface.dropTable('UserAccessLevels'),
};
