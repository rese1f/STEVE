async function mineOneLapisOreSafely(bot) {
  // Check if the bot's hunger is less than the maximum hunger
  if (bot.food < 20) {
    // Check if the bot has enough food in the inventory
    const food = bot.inventory.items().find(item => item.foodPoints);

    // If not, find and kill a pig to obtain food
    if (!food) {
      await killMob(bot, "pig", 300);
    }

    // Consume the food to restore hunger
    await bot.equip(food, "hand");
    await bot.consume();
  }

  // Equip the iron_pickaxe
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.iron_pickaxe.id);
  await bot.equip(ironPickaxe, "hand");

  // Find a lapis_ore block nearby or explore the area to find one
  let lapisOre = bot.findBlock({
    matching: mcData.blocksByName.lapis_ore.id,
    maxDistance: 32
  });
  if (!lapisOre) {
    lapisOre = await exploreUntil(bot, new Vec3(1, -1, 1), 60, () => {
      const lapisOreBlock = bot.findBlock({
        matching: mcData.blocksByName.lapis_ore.id,
        maxDistance: 32
      });
      return lapisOreBlock;
    });
  }

  // Mine the lapis_ore block using the iron_pickaxe
  if (lapisOre) {
    await mineBlock(bot, "lapis_ore", 1);
    bot.chat("1 lapis ore mined safely.");
  } else {
    bot.chat("Could not find a lapis ore block.");
  }
}