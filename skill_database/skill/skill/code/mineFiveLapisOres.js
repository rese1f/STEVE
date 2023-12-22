async function mineFiveLapisOres(bot) {
  // Check if the bot has a stone pickaxe, iron pickaxe, or diamond pickaxe in its inventory
  const stonePickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["stone_pickaxe"].id);
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["iron_pickaxe"].id);
  const diamondPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["diamond_pickaxe"].id);

  // Equip the best pickaxe available
  if (diamondPickaxe) {
    await bot.equip(diamondPickaxe, "hand");
  } else if (ironPickaxe) {
    await bot.equip(ironPickaxe, "hand");
  } else if (stonePickaxe) {
    await bot.equip(stonePickaxe, "hand");
  } else {
    bot.chat("I don't have a stone, iron, or diamond pickaxe to mine lapis ores.");
    return;
  }

  // Explore the underground area to find lapis ores
  const lapisOres = await exploreUntil(bot, new Vec3(0, -1, 0), 60, () => {
    const lapis_ores = bot.findBlocks({
      matching: mcData.blocksByName["lapis_ore"].id,
      maxDistance: 32,
      count: 5
    });
    return lapis_ores.length >= 5 ? lapis_ores : null;
  });

  // Mine 5 lapis ores using the equipped pickaxe
  if (lapisOres) {
    await mineBlock(bot, "lapis_ore", 5);
    bot.chat("5 lapis ores mined.");
  } else {
    bot.chat("Could not find 5 lapis ores.");
  }
}