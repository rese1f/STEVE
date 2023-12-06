async function mineFiveDeepslateRedstoneOres(bot) {
  // Equip the diamond pickaxe
  const diamondPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["diamond_pickaxe"].id);
  await bot.equip(diamondPickaxe, "hand");

  // Explore the underground area to find deepslate_redstone_ore
  const deepslateRedstoneOres = await exploreUntil(bot, new Vec3(0, -1, 0), 60, () => {
    const deepslate_redstone_ores = bot.findBlocks({
      matching: mcData.blocksByName["deepslate_redstone_ore"].id,
      maxDistance: 32,
      count: 5
    });
    return deepslate_redstone_ores.length >= 5 ? deepslate_redstone_ores : null;
  });

  // Mine 5 deepslate_redstone_ore using the equipped diamond_pickaxe
  if (deepslateRedstoneOres) {
    await mineBlock(bot, "deepslate_redstone_ore", 5);
    bot.chat("5 deepslate redstone ores mined.");
  } else {
    bot.chat("Could not find 5 deepslate redstone ores.");
  }
}