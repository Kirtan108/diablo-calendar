const { profileModel } = require("../../models.js");

async function getMaterials(userId) {
  try {
    const user = await profileModel.findOne({ user_id: userId });

    if (!user) {
      console.log(`User with ID ${userId} not found.`);
      return null; // Or handle the user-not-found case as needed
    }

    // Initialize materials to default if not present
    if (!user.materials) {
      user.materials = new Map([
        ["Mucus-Slick Egg", 0],
        ["Shard of Agony", 0],
      ]);
      await user.save(); // Save the user with the initialized materials
    }
    return user.materials; // Or return user if you need the entire profile
  } catch (error) {
    console.log(error);
  }
}

module.exports = getMaterials