async function mineTenRedstoneOres(bot) {
  // Step 1: Equip the iron pickaxe
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.iron_pickaxe.id);
  await bot.equip(ironPickaxe, "hand");

  // Step 2: Explore the area below layer 16 to find redstone ore blocks
  let redstoneOres = await exploreUntil(bot, new Vec3(1, -1, 1), 60, () => {
    if (bot.entity.position.y > 16) return null;
    const redstoneOreBlocks = bot.findBlocks({
      matching: mcData.blocksByName.redstone_ore.id,
      maxDistance: 32,
      count: 10
    });
    return redstoneOreBlocks.length >= 10 ? redstoneOreBlocks : null;
  });

  // Step 3: Mine 10 redstone ore blocks using the iron pickaxe
  if (redstoneOres) {
    await mineBlock(bot, "redstone_ore", 10);
    bot.chat("10 redstone ores mined.");
  } else {
    bot.chat("Could not find 10 redstone ore blocks.");
  }
}