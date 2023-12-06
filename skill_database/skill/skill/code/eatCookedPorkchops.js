async function eatCookedPorkchops(bot) {
  for (let i = 0; i < 3; i++) {
    // Equip the cooked porkchop in the bot's hand
    const cookedPorkchop = bot.inventory.findInventoryItem(mcData.itemsByName.cooked_porkchop.id);
    await bot.equip(cookedPorkchop, "hand");

    // Consume the cooked porkchop
    await bot.consume();
  }
  bot.chat("3 cooked porkchops eaten.");
}