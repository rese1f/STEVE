async function collectSugarCanes(bot) {
  // Find 3 sugar cane blocks nearby
  const sugarCaneBlocks = bot.findBlocks({
    matching: mcData.blocksByName["sugar_cane"].id,
    maxDistance: 32,
    count: 3
  });

  // Mine the sugar cane blocks
  if (sugarCaneBlocks.length >= 3) {
    await mineBlock(bot, "sugar_cane", 3);
    bot.chat("3 sugar canes collected.");
  } else {
    bot.chat("Could not find enough sugar canes nearby.");
  }
}