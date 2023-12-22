async function mineFiveCalciteBlocks(bot) {
  // Step 1: Equip the iron_pickaxe
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.iron_pickaxe.id);
  await bot.equip(ironPickaxe, "hand");

  // Step 2: Find a calcite block nearby or explore the area to find one
  let calciteBlock = bot.findBlock({
    matching: mcData.blocksByName.calcite.id,
    maxDistance: 32
  });
  if (!calciteBlock) {
    calciteBlock = await exploreUntil(bot, new Vec3(1, -1, 1), 60, () => {
      const calcite = bot.findBlock({
        matching: mcData.blocksByName.calcite.id,
        maxDistance: 32
      });
      return calcite;
    });
  }

  // Step 3: Mine 5 calcite blocks using the iron_pickaxe
  if (calciteBlock) {
    await mineBlock(bot, "calcite", 5);
    bot.chat("5 calcite blocks mined.");
  } else {
    bot.chat("Could not find calcite blocks.");
  }
}