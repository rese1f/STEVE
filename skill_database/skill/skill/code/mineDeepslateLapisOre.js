async function mineDeepslateLapisOre(bot) {
  // Step 1: Equip the iron_pickaxe
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.iron_pickaxe.id);
  await bot.equip(ironPickaxe, "hand");

  // Step 2: Find a deepslate_lapis_ore block nearby or explore the area to find one
  let deepslateLapisOre = bot.findBlock({
    matching: mcData.blocksByName.deepslate_lapis_ore.id,
    maxDistance: 32
  });
  if (!deepslateLapisOre) {
    deepslateLapisOre = await exploreUntil(bot, new Vec3(1, -1, 1), 60, () => {
      const deepslateLapisOreBlock = bot.findBlock({
        matching: mcData.blocksByName.deepslate_lapis_ore.id,
        maxDistance: 32
      });
      return deepslateLapisOreBlock;
    });
  }

  // Step 3: Mine the deepslate_lapis_ore block using the iron_pickaxe
  if (deepslateLapisOre) {
    await mineBlock(bot, "deepslate_lapis_ore", 1);
    bot.chat("1 deepslate lapis ore mined.");
  } else {
    bot.chat("Could not find a deepslate lapis ore block.");
  }
}