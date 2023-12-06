async function eatCookedPorkchop(bot) {
  // Check if the bot has at least 1 cooked porkchop in its inventory
  const cookedPorkchop = bot.inventory.findInventoryItem(mcData.itemsByName["cooked_porkchop"].id);
  if (cookedPorkchop) {
    // Equip the cooked porkchop in the main hand
    await bot.equip(cookedPorkchop, "hand");

    // Consume the cooked porkchop
    await bot.consume();
    bot.chat("Ate 1 cooked porkchop.");
  } else {
    bot.chat("No cooked porkchop in inventory.");
  }
}

async function eatOneCookedPorkchop(bot) {
  await eatCookedPorkchop(bot);
}