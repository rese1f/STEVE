async function smeltTenRawIron(bot) {
  // Check if there is a furnace in the inventory or nearby
  const furnace = bot.findBlock({
    matching: mcData.blocksByName.furnace.id,
    maxDistance: 32
  });

  // If not, place the furnace from the inventory
  if (!furnace) {
    const furnaceItem = bot.inventory.findInventoryItem(mcData.itemsByName.furnace.id);
    if (furnaceItem) {
      const furnacePosition = bot.entity.position.offset(1, 0, 0);
      await placeItem(bot, "furnace", furnacePosition);
    } else {
      bot.chat("No furnace found.");
      return;
    }
  }

  // Smelt 10 raw iron using coal as fuel
  await smeltItem(bot, "raw_iron", "coal", 10);
  bot.chat("10 raw iron smelted.");
}