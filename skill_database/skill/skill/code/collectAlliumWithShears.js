async function collectAlliumWithShears(bot) {
  // Find an allium flower nearby
  const allium = bot.findBlock({
    matching: mcData.blocksByName["allium"].id,
    maxDistance: 32
  });
  if (!allium) {
    bot.chat("No allium flower found nearby.");
    return;
  }

  // Go near the allium flower
  await bot.pathfinder.goto(new GoalGetToBlock(allium.position.x, allium.position.y, allium.position.z));

  // Equip the shears
  const shears = bot.inventory.findInventoryItem(mcData.itemsByName["shears"].id);
  await bot.equip(shears, "hand");

  // Use the shears on the allium flower to collect it
  await bot.useOn(allium);
  bot.chat("Collected 1 allium using shears.");
}