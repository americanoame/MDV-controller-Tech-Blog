const User = require('./User');
const Tech = require('./Tech');
const Comment = require('./Comment');

User.hasMany(Tech, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Tech.belongsTo(User, {
  foreignKey: 'tech_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Tech.hasMany(Comment, {
  foreignKey: 'tech_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Tech, {
  foreignKey: 'tech_id'
});

module.exports = { User, Tech, Comment };
