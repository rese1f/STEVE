async function mineOneRedstoneOre(bot) {
  // Step 1: Equip the iron pickaxe
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.iron_pickaxe.id);
  await bot.equip(ironPickaxe, "hand");

  // Step 2: Explore the area below layer 16 to find a redstone ore block
  let redstoneOre = await exploreUntil(bot, new Vec3(1, -1, 1), 60, () => {
    if (bot.entity.position.y > 16) return null;
    const redstoneOreBlock = bot.findBlock({
      matching: mcData.blocksByName.redstone_ore.id,
      maxDistance: 32
    });
    return redstoneOreBlock;
  });

  // Step 3: Mine the redstone ore block using the iron pickaxe
  if (redstoneOre) {
    await mineBlock(bot, "redstone_ore", 1);
    bot.chat("1 redstone ore mined.");
  } else {
    bot.chat("Could not find a redstone ore block.");
  }
}