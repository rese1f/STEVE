async function mineOneIronOre(bot) {
  // Equip the stone_pickaxe
  const stonePickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.stone_pickaxe.id);
  await bot.equip(stonePickaxe, "hand");

  // Find an iron_ore block nearby
  let ironOre = bot.findBlock({
    matching: mcData.blocksByName.iron_ore.id,
    maxDistance: 32
  });

  // If not found, explore the area to find an iron_ore block
  if (!ironOre) {
    ironOre = await exploreUntil(bot, new Vec3(1, -1, 1), 60, () => {
      const ironOreBlock = bot.findBlock({
        matching: mcData.blocksByName.iron_ore.id,
        maxDistance: 32
      });
      return ironOreBlock;
    });
  }

  // Mine the iron_ore block using the stone_pickaxe
  if (ironOre) {
    await mineBlock(bot, "iron_ore", 1);
    bot.chat("1 iron ore mined.");
  } else {
    bot.chat("Could not find an iron ore block.");
  }
}