async function mineOneDeepslateDiamondOre(bot) {
  // Equip the diamond pickaxe
  const diamondPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["diamond_pickaxe"].id);
  await bot.equip(diamondPickaxe, "hand");

  // Explore the underground area around level 12
  const deepslateDiamondOre = await exploreUntil(bot, new Vec3(0, -1, 0), 60, () => {
    const deepslate_diamond_ore = bot.findBlock({
      matching: mcData.blocksByName["deepslate_diamond_ore"].id,
      maxDistance: 32,
      minY: 5,
      maxY: 12
    });
    return deepslate_diamond_ore;
  });

  // Mine the deepslate diamond ore when found
  if (deepslateDiamondOre) {
    await mineBlock(bot, "deepslate_diamond_ore", 1);
    bot.chat("1 deepslate diamond ore mined.");
  } else {
    bot.chat("Could not find deepslate diamond ore.");
  }
}