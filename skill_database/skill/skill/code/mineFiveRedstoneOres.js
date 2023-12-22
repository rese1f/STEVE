async function mineFiveRedstoneOres(bot) {
  // Check if the bot has an iron pickaxe or a diamond pickaxe in its inventory
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["iron_pickaxe"].id);
  const diamondPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["diamond_pickaxe"].id);

  // Equip the iron pickaxe or diamond pickaxe
  if (ironPickaxe) {
    await bot.equip(ironPickaxe, "hand");
  } else if (diamondPickaxe) {
    await bot.equip(diamondPickaxe, "hand");
  } else {
    bot.chat("I don't have an iron or diamond pickaxe to mine redstone ores.");
    return;
  }

  // Explore the underground area around level 16 or below
  const redstoneOres = await exploreUntil(bot, new Vec3(0, -1, 0), 60, () => {
    const redstone_ores = bot.findBlocks({
      matching: mcData.blocksByName["redstone_ore"].id,
      maxDistance: 32,
      minY: 0,
      maxY: 16,
      count: 5
    });
    return redstone_ores.length >= 5 ? redstone_ores : null;
  });

  // Mine the redstone ores when found
  if (redstoneOres) {
    await mineBlock(bot, "redstone_ore", 5);
    bot.chat("5 redstone ores mined.");
  } else {
    bot.chat("Could not find 5 redstone ores.");
  }
}