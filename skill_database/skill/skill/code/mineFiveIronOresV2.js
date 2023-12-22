async function mineFiveIronOres(bot) {
  // Equip the stone pickaxe
  const stonePickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["stone_pickaxe"].id);
  await bot.equip(stonePickaxe, "hand");

  // Explore until finding an iron ore block
  const ironOre = await exploreUntil(bot, new Vec3(0, -1, 0), 60, () => {
    const iron_ore = bot.findBlock({
      matching: mcData.blocksByName["iron_ore"].id,
      maxDistance: 32
    });
    return iron_ore;
  });

  // Mine 5 iron ore blocks
  await mineBlock(bot, "iron_ore", 5);
  bot.chat("5 iron ores mined.");
}