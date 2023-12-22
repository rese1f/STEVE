async function mineOneDiamondOre(bot) {
  // Equip the iron_pickaxe
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.iron_pickaxe.id);
  await bot.equip(ironPickaxe, "hand");

  // Find a diamond_ore block nearby or explore the area to find one
  let diamondOre = bot.findBlock({
    matching: mcData.blocksByName.diamond_ore.id,
    maxDistance: 32
  });
  if (!diamondOre) {
    diamondOre = await exploreUntil(bot, new Vec3(1, -1, 1), 60, () => {
      const diamondOreBlock = bot.findBlock({
        matching: mcData.blocksByName.diamond_ore.id,
        maxDistance: 32
      });
      return diamondOreBlock;
    });
  }

  // Mine the diamond_ore block using the iron_pickaxe
  if (diamondOre) {
    await mineBlock(bot, "diamond_ore", 1);
    bot.chat("1 diamond ore mined.");
  } else {
    bot.chat("Could not find a diamond ore block.");
  }
}