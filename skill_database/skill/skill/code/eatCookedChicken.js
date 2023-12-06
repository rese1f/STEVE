async function eatCookedChicken(bot) {
  // Check if the bot has at least 1 cooked chicken in its inventory
  const cookedChicken = bot.inventory.findInventoryItem(mcData.itemsByName["cooked_chicken"].id);
  if (cookedChicken) {
    // Equip the cooked chicken in the main hand
    await bot.equip(cookedChicken, "hand");

    // Consume the cooked chicken
    await bot.consume();
    bot.chat("Ate 1 cooked chicken.");
  } else {
    bot.chat("No cooked chicken in inventory.");
  }
}