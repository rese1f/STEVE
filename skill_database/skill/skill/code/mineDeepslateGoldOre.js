async function mineDeepslateGoldOre(bot) {
  // Step 1: Equip the iron_pickaxe
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.iron_pickaxe.id);
  await bot.equip(ironPickaxe, "hand");

  // Step 2: Find a deepslate_gold_ore block nearby or explore the area to find one
  let deepslateGoldOre = bot.findBlock({
    matching: mcData.blocksByName.deepslate_gold_ore.id,
    maxDistance: 32
  });
  if (!deepslateGoldOre) {
    deepslateGoldOre = await exploreUntil(bot, new Vec3(1, -1, 1), 60, () => {
      const deepslateGoldOreBlock = bot.findBlock({
        matching: mcData.blocksByName.deepslate_gold_ore.id,
        maxDistance: 32
      });
      return deepslateGoldOreBlock;
    });
  }

  // Step 3: Mine the deepslate_gold_ore block using the iron_pickaxe
  if (deepslateGoldOre) {
    await mineBlock(bot, "deepslate_gold_ore", 1);
    bot.chat("1 deepslate gold ore mined.");
  } else {
    bot.chat("Could not find a deepslate gold ore block.");
  }
}