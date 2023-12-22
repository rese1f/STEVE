async function mineOneDiamondOre(bot) {
  // Equip the iron pickaxe
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["iron_pickaxe"].id);
  await bot.equip(ironPickaxe, "hand");

  // Explore the underground area around level 12
  const diamondOre = await exploreUntil(bot, new Vec3(0, -1, 0), 60, () => {
    const diamond_ore = bot.findBlock({
      matching: mcData.blocksByName["diamond_ore"].id,
      maxDistance: 32,
      minY: 10,
      maxY: 14
    });
    return diamond_ore;
  });

  // Mine the diamond ore when found
  if (diamondOre) {
    await mineBlock(bot, "diamond_ore", 1);
    bot.chat("1 diamond ore mined.");
  } else {
    bot.chat("Could not find diamond ore.");
  }
}