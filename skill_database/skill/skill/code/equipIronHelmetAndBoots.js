async function equipIronHelmetAndBoots(bot) {
  // Find the iron helmet in the bot's inventory
  const ironHelmet = bot.inventory.findInventoryItem(mcData.itemsByName["iron_helmet"].id);

  // Equip the iron helmet in the "head" slot
  if (ironHelmet) {
    await bot.equip(ironHelmet, "head");
    bot.chat("Iron helmet equipped.");
  } else {
    bot.chat("No iron helmet found in inventory.");
  }

  // Find the iron boots in the bot's inventory
  const ironBoots = bot.inventory.findInventoryItem(mcData.itemsByName["iron_boots"].id);

  // Equip the iron boots in the "feet" slot
  if (ironBoots) {
    await bot.equip(ironBoots, "feet");
    bot.chat("Iron boots equipped.");
  } else {
    bot.chat("No iron boots found in inventory.");
  }
}