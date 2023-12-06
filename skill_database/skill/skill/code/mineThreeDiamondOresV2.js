async function mineThreeDiamondOres(bot) {
  // Check if the bot has an iron pickaxe or a diamond pickaxe in its inventory
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["iron_pickaxe"].id);
  const diamondPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["diamond_pickaxe"].id);

  // Equip the iron pickaxe or diamond pickaxe
  if (ironPickaxe) {
    await bot.equip(ironPickaxe, "hand");
  } else if (diamondPickaxe) {
    await bot.equip(diamondPickaxe, "hand");
  } else {
    bot.chat("I don't have an iron or diamond pickaxe to mine diamond ores.");
    return;
  }

  // Explore the underground area around level 12
  const diamondOres = await exploreUntil(bot, new Vec3(0, -1, 0), 60, () => {
    const diamond_ores = bot.findBlocks({
      matching: mcData.blocksByName["diamond_ore"].id,
      maxDistance: 32,
      minY: 10,
      maxY: 14,
      count: 3
    });
    return diamond_ores.length >= 3 ? diamond_ores : null;
  });

  // Mine the diamond ores when found
  if (diamondOres) {
    await mineBlock(bot, "diamond_ore", 3);
    bot.chat("3 diamond ores mined.");
  } else {
    bot.chat("Could not find 3 diamond ores.");
  }
}