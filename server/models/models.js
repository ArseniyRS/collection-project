
import seq from '../db.js'
import Sequelize from 'sequelize';

const File = seq.define('File',{
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: Sequelize.STRING, allowNull: false},
  type: {type: Sequelize.STRING, allowNull: false},
  accessLink: {type: Sequelize.STRING},
  size: {type: Sequelize.INTEGER, defaultValue: 0},
  path: {type: Sequelize.STRING, defaultValue: ''},
  orderId: {type: Sequelize.INTEGER, defaultValue: 0},
  color: {type: Sequelize.STRING}
})

const User = seq.define('User',{
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  username: {type: Sequelize.STRING, allowNull: false, unique: true},
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false },
  storageSpace: { type: Sequelize.BIGINT, defaultValue: 1024 ** 3 * 10 },
  usedSpace: { type: Sequelize.INTEGER, defaultValue: 0 },
  avatar: { type: Sequelize.STRING },
});

User.hasMany(File, {onDelete: 'cascade'})
File.belongsTo(User)
File.hasMany(File, {onDelete: 'cascade'})
File.belongsTo(File)


export {User, File}