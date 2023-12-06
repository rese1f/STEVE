async function killOneCreeper(bot) {
  // Equip the iron sword
  const ironSword = bot.inventory.findInventoryItem(mcData.itemsByName["iron_sword"].id);
  await bot.equip(ironSword, "hand");

  // Explore until finding a creeper
  const creeper = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const creeper = bot.nearestEntity(entity => {
      return entity.name === "creeper" && entity.position.distanceTo(bot.entity.position) < 32;
    });
    return creeper;
  });
  if (creeper) {
    // Attack the creeper while maintaining a safe distance
    await killMob(bot, "creeper", 300);
    bot.chat("Killed 1 creeper.");
  } else {
    bot.chat("Could not find a creeper.");
  }
}