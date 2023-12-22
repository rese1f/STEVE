async function placeChest(bot) {
  const chest = bot.inventory.findInventoryItem(mcData.itemsByName["chest"].id);
  if (chest) {
    const chestPosition = bot.entity.position.offset(1, 0, 0);
    await placeItem(bot, "chest", chestPosition);
    bot.chat("Chest placed.");
  } else {
    bot.chat("No chest found in inventory.");
  }
}