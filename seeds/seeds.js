const sequelize = require("../config/connection");
const { User, Tech, Comment } = require('../models');

const userData = require("./userData.json");
const techData = require("./techData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // The await keyword is used to ensure that each Tech.create() 
  // call is resolved before the next iteration of the loop starts. 
  // This is necessary because Tech.create() is an asynchronous function
  // that returns a Promise, and the loop should not proceed to the next
  // iteration until the Promise is resolved.

  for (const tech of techData) {
    await Tech.create({
      ...tech,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  };

  // The bulkCreate() method is used to efficiently create multiple 
  // records in a single database query.

  await Comment.bulkCreate(commentData);

  // The final line of code (process.exit(0)) terminates the script with a status code of 0, 
  process.exit(0);
};

seedDatabase();