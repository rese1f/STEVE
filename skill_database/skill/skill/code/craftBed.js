async function craftBed(bot) {
  // Check if there is a crafting table in the inventory or nearby
  let craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName["crafting_table"].id);
  if (!craftingTable) {
    craftingTable = bot.findBlock({
      matching: mcData.blocksByName["crafting_table"].id,
      maxDistance: 32
    });
    if (!craftingTable) {
      // Mine oak logs and craft oak planks
      await mineBlock(bot, "oak_log", 1);
      await craftItem(bot, "oak_planks", 2);
      // Craft a crafting table using oak planks
      await craftItem(bot, "crafting_table", 1);
    }
  }

  // Find a suitable position to place the crafting table if it's not already placed
  const tablePosition = bot.entity.position.offset(1, 0, 0);
  const tableBlock = bot.blockAt(tablePosition);
  if (!tableBlock || tableBlock.name !== "crafting_table") {
    if (tableBlock && tableBlock.name === "lily_of_the_valley") {
      // Find a different position to place the crafting table
      const newPosition = bot.entity.position.offset(-1, 0, 0);
      await placeItem(bot, "crafting_table", newPosition);
    } else {
      await placeItem(bot, "crafting_table", tablePosition);
    }
  }

  // Check if there are enough wool blocks in the inventory
  let wool = bot.inventory.findInventoryItem(mcData.itemsByName["white_wool"].id);
  if (!wool || wool.count < 3) {
    // Find a sheep and use shears to collect wool
    bot.chat("Finding a sheep to collect wool...");
    const sheep = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const sheep = bot.nearestEntity(entity => {
        return entity.name === "sheep" && entity.position.distanceTo(bot.entity.position) < 32;
      });
      return sheep;
    });
    await bot.pathfinder.goto(new GoalGetToBlock(sheep.position.x, sheep.position.y, sheep.position.z));
    await bot.equip(mcData.itemsByName["shears"].id, "hand");
    await bot.useOn(sheep);
    wool = bot.inventory.findInventoryItem(mcData.itemsByName["white_wool"].id);
  }

  // Check if there are enough wooden planks in the inventory
  let oakPlanks = bot.inventory.findInventoryItem(mcData.itemsByName["oak_planks"].id);
  if (!oakPlanks || oakPlanks.count < 3) {
    // Mine oak logs and craft oak planks
    bot.chat("Mining oak logs to craft oak planks...");
    await mineBlock(bot, "oak_log", 1);
    bot.chat("Crafting oak planks...");
    await craftItem(bot, "oak_planks", 1);
  }

  // Craft a bed using the wool blocks and wooden planks
  bot.chat("Crafting a bed...");
  await craftItem(bot, "white_bed", 1);
  bot.chat("Bed crafted.");
}