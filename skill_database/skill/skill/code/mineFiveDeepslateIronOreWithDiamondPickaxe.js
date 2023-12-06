async function mineFiveDeepslateIronOreWithDiamondPickaxe(bot) {
  // Step 1: Equip the diamond_pickaxe
  const diamondPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.diamond_pickaxe.id);
  await bot.equip(diamondPickaxe, "hand");

  // Step 2: Find a deepslate_iron_ore block nearby or explore the area to find one
  let deepslateIronOre = bot.findBlock({
    matching: mcData.blocksByName.deepslate_iron_ore.id,
    maxDistance: 32
  });
  if (!deepslateIronOre) {
    deepslateIronOre = await exploreUntil(bot, new Vec3(1, -1, 1), 60, () => {
      const deepslateIronOreBlock = bot.findBlock({
        matching: mcData.blocksByName.deepslate_iron_ore.id,
        maxDistance: 32
      });
      return deepslateIronOreBlock;
    });
  }

  // Step 3: Mine 5 deepslate_iron_ore blocks using the diamond_pickaxe
  if (deepslateIronOre) {
    await mineBlock(bot, "deepslate_iron_ore", 5);
    bot.chat("5 deepslate iron ores mined with diamond pickaxe.");
  } else {
    bot.chat("Could not find deepslate iron ore blocks.");
  }
}