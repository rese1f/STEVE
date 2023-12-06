async function obtainAmethystShard(bot) {
  // Equip the iron pickaxe
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["iron_pickaxe"].id);
  await bot.equip(ironPickaxe, "hand");

  // Explore the underground area to find an amethyst geode
  const amethystGeode = await exploreUntil(bot, new Vec3(0, -1, 0), 120, () => {
    const amethyst_geode = bot.findBlock({
      matching: mcData.blocksByName["amethyst_cluster"].id,
      maxDistance: 32
    });
    return amethyst_geode;
  });

  // Mine the amethyst geode to obtain 1 amethyst shard
  if (amethystGeode) {
    await mineBlock(bot, "amethyst_cluster", 1);
    bot.chat("1 amethyst shard obtained.");
  } else {
    bot.chat("Could not find an amethyst geode. Increasing exploration time and trying again.");
    await obtainAmethystShard(bot);
  }
}