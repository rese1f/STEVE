async function checkWoodenShovel(bot) {
  const woodenShovel = bot.inventory.findInventoryItem(mcData.itemsByName["wooden_shovel"].id);
  if (woodenShovel) {
    bot.chat("Wooden shovel already in inventory. Task completed.");
  } else {
    bot.chat("Wooden shovel not found in inventory.");
  }
}