async function mineFivePointedDripstone(bot) {
  // Step 1: Equip the iron_pickaxe
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName.iron_pickaxe.id);
  await bot.equip(ironPickaxe, "hand");

  // Step 2: Find a pointed_dripstone block nearby or explore the area to find one
  let pointedDripstone = bot.findBlock({
    matching: mcData.blocksByName.pointed_dripstone.id,
    maxDistance: 32
  });
  if (!pointedDripstone) {
    pointedDripstone = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const pointedDripstoneBlock = bot.findBlock({
        matching: mcData.blocksByName.pointed_dripstone.id,
        maxDistance: 32
      });
      return pointedDripstoneBlock;
    });
  }

  // Step 3: Mine 5 pointed_dripstone blocks using the iron_pickaxe
  if (pointedDripstone) {
    await mineBlock(bot, "pointed_dripstone", 5);
    bot.chat("5 pointed dripstone blocks mined.");
  } else {
    bot.chat("Could not find pointed dripstone blocks.");
  }
}