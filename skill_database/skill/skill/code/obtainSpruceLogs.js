async function obtainSpruceLogs(bot) {
  // Find 3 spruce_log blocks
  const spruceLogs = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const spruceLog = bot.findBlock({
      matching: mcData.blocksByName["spruce_log"].id,
      maxDistance: 32,
      count: 3
    });
    return spruceLog ? spruceLog : null;
  });
  if (spruceLogs) {
    // Mine the spruce_log blocks
    await mineBlock(bot, "spruce_log", 3);
    bot.chat("3 spruce logs obtained.");
  } else {
    bot.chat("Could not find enough spruce logs.");
  }
}