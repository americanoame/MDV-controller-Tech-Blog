const User = require('./User');
const Tech = require('./Project');
const comment = require("comment");

User.hasMany(Tech, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Tech.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Tech, {
  foreignKey: 'tech_id'
});

module.exports = {User, Project, Comment};
