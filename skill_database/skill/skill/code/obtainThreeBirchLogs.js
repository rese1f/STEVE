async function obtainThreeBirchLogs(bot) {
  const chestPosition = new Vec3(-17, 1, 17);
  const startingPosition = bot.entity.position.clone();

  // Check if the bot is already near the chest
  if (bot.entity.position.distanceTo(chestPosition) > 5) {
    // Use exploreUntil to find a path to the chest
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const chest = bot.findBlock({
        matching: mcData.blocksByName["chest"].id,
        maxDistance: 32
      });
      return chest;
    });
  }

  // Take 3 birch logs from the chest
  await getItemFromChest(bot, chestPosition, {
    "birch_log": 3
  });

  // Return to the starting position
  await bot.pathfinder.goto(new GoalNear(startingPosition.x, startingPosition.y, startingPosition.z, 1));
  bot.chat("Obtained 3 birch logs.");
}