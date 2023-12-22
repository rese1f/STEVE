async function equipIronLeggings(bot) {
  // Find the iron leggings in the bot's inventory
  const ironLeggings = bot.inventory.findInventoryItem(mcData.itemsByName["iron_leggings"].id);

  // Equip the iron leggings in the "legs" slot
  if (ironLeggings) {
    await bot.equip(ironLeggings, "legs");
    bot.chat("Iron leggings equipped.");
  } else {
    bot.chat("No iron leggings found in inventory.");
  }
}