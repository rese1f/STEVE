async function eatRottenFlesh(bot) {
  // Equip the rotten flesh in the bot's hand
  const rottenFlesh = bot.inventory.findInventoryItem(mcData.itemsByName.rotten_flesh.id);
  await bot.equip(rottenFlesh, "hand");

  // Consume the rotten flesh
  await bot.consume();
  bot.chat("Rotten flesh consumed.");
}