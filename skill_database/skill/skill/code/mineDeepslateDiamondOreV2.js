async function mineDeepslateDiamondOre(bot) {
  // Step 1: Equip the diamond_pickaxe
  const diamondPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.diamond_pickaxe.id);
  await bot.equip(diamondPickaxe, "hand");

  // Step 2: Find a deepslate_diamond_ore block nearby or explore the area to find one
  let deepslateDiamondOre = bot.findBlock({
    matching: mcData.blocksByName.deepslate_diamond_ore.id,
    maxDistance: 32
  });
  if (!deepslateDiamondOre) {
    deepslateDiamondOre = await exploreUntil(bot, new Vec3(1, -1, 1), 60, () => {
      const deepslateDiamondOreBlock = bot.findBlock({
        matching: mcData.blocksByName.deepslate_diamond_ore.id,
        maxDistance: 32
      });
      return deepslateDiamondOreBlock;
    });
  }

  // Step 3: Mine the deepslate_diamond_ore block using the diamond_pickaxe
  if (deepslateDiamondOre) {
    await mineBlock(bot, "deepslate_diamond_ore", 1);
    bot.chat("1 deepslate diamond ore mined.");
  } else {
    bot.chat("Could not find a deepslate diamond ore block.");
  }
}