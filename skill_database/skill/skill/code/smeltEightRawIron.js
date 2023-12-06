async function smeltEightRawIron(bot) {
  // Check if there is a furnace in the inventory or nearby
  let furnace = bot.inventory.findInventoryItem(mcData.itemsByName["furnace"].id);
  if (!furnace) {
    furnace = bot.findBlock({
      matching: mcData.blocksByName["furnace"].id,
      maxDistance: 32
    });
  }

  // Place the furnace near the player if it's not already placed
  const furnacePosition = bot.entity.position.offset(1, 0, 0);
  const furnaceBlock = bot.blockAt(furnacePosition);
  if (!furnaceBlock || furnaceBlock.name !== "furnace") {
    await placeItem(bot, "furnace", furnacePosition);
  }

  // Smelt 8 raw iron using coal as fuel
  await smeltItem(bot, "raw_iron", "coal", 8);
  bot.chat("8 raw iron smelted.");
}