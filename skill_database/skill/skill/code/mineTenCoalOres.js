async function mineTenCoalOres(bot) {
  // Check if there are 10 coal ores nearby
  const coalOres = bot.findBlocks({
    matching: mcData.blocksByName["coal_ore"].id,
    maxDistance: 32,
    count: 10
  });

  // If not, explore the area to find coal ores
  if (coalOres.length < 10) {
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const coalOre = bot.findBlock({
        matching: mcData.blocksByName["coal_ore"].id,
        maxDistance: 32
      });
      return coalOre;
    });
  }

  // Mine 10 coal ores using the iron_pickaxe
  await mineBlock(bot, "coal_ore", 10);
  bot.chat("10 coal ores mined.");
}