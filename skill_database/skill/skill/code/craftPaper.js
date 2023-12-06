async function findSuitablePosition(bot) {
  const offsets = [new Vec3(1, 0, 0), new Vec3(-1, 0, 0), new Vec3(0, 0, 1), new Vec3(0, 0, -1)];
  for (const offset of offsets) {
    const position = bot.entity.position.offset(offset.x, offset.y, offset.z);
    const block = bot.blockAt(position);
    if (block.name === "air" || block.name === "water") {
      const belowBlock = bot.blockAt(position.offset(0, -1, 0));
      if (belowBlock.name !== "air" && belowBlock.name !== "water") {
        return position;
      }
    }
  }
  return null;
}

async function craftPaper(bot) {
  // Check if there are enough sugar canes in the inventory
  const sugarCanes = bot.inventory.findInventoryItem(mcData.itemsByName.sugar_cane.id);
  if (!sugarCanes || sugarCanes.count < 3) {
    // Explore the area to find more sugar canes
    await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const sugarCane = bot.findBlock({
        matching: mcData.blocksByName.sugar_cane.id,
        maxDistance: 32
      });
      return sugarCane;
    });

    // Mine the sugar canes
    await mineBlock(bot, "sugar_cane", 3 - (sugarCanes ? sugarCanes.count : 0));
  }

  // Check if there is a crafting table nearby or in the inventory
  const craftingTable = bot.findBlock({
    matching: mcData.blocksByName.crafting_table.id,
    maxDistance: 32
  }) || bot.inventory.findInventoryItem(mcData.itemsByName.crafting_table.id);

  // If not, craft a crafting table using the oak_log in the inventory
  if (!craftingTable) {
    await craftItem(bot, "crafting_table", 1);
  }

  // Find a suitable position to place the crafting table if it's not already placed
  const craftingTableBlock = bot.findBlock({
    matching: mcData.blocksByName.crafting_table.id,
    maxDistance: 32
  });
  let craftingTablePosition;
  if (!craftingTableBlock) {
    craftingTablePosition = await findSuitablePosition(bot);
    if (!craftingTablePosition) {
      bot.chat("No suitable position found to place the crafting table.");
      return;
    }
  } else {
    craftingTablePosition = craftingTableBlock.position;
  }

  // Place the crafting table at the suitable position
  await placeItem(bot, "crafting_table", craftingTablePosition);

  // Craft 3 paper using the sugar canes
  await craftItem(bot, "paper", 1);
  bot.chat("3 paper crafted.");
}