module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
      description: 'Title of users',
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      description: 'First name of user',
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      description: 'Last Name of user',
    },
    email: {
      type: Sequelize.STRING,
      description: 'Email of user',
      unique: true,
      allowNull: false
    },
    verified: {
      type: Sequelize.BOOLEAN,
      description: 'Verification status of user',
    },
    phoneNumber: {
      type: Sequelize.STRING,
      description: 'Phone Number of user',
    },
    gender: {
      type: Sequelize.ENUM,
      values: ['male', 'female'],
      description: 'Gender of user',
    },
    role: {
      type: Sequelize.STRING,
      description: 'Role of User',
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      description: 'Password of user, should be a hash',
    },
    token: {
      type: Sequelize.STRING,
      description: 'Token used to reset password',
    },
    team: {
      type: Sequelize.STRING,
      description: 'Team user belongs',
    },
    profile_image_url: {
      type: Sequelize.STRING,
      description: 'Profile Image of user',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Users'),
};