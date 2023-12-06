async function craftIronLeggingsWithSmelting(bot) {
  // Check if there are enough iron ingots in the inventory
  let ironIngots = bot.inventory.findInventoryItem(mcData.itemsByName["iron_ingot"].id);
  if (!ironIngots || ironIngots.count < 7) {
    const chestPosition = new Vec3(-17, 1, 17);
    await getItemFromChest(bot, chestPosition, {
      "iron_ingot": 7 - (ironIngots ? ironIngots.count : 0),
      "raw_iron": 7 - (ironIngots ? ironIngots.count : 0)
    });
    ironIngots = bot.inventory.findInventoryItem(mcData.itemsByName["iron_ingot"].id);
    const rawIron = bot.inventory.findInventoryItem(mcData.itemsByName["raw_iron"].id);

    // Check if there is a furnace nearby or in the inventory
    let furnace = bot.inventory.findInventoryItem(mcData.itemsByName["furnace"].id);
    if (!furnace) {
      furnace = bot.findBlock({
        matching: mcData.blocksByName["furnace"].id,
        maxDistance: 32
      });
      if (!furnace) {
        // Craft a furnace using cobblestone
        await mineBlock(bot, "stone", 8);
        await craftItem(bot, "furnace", 1);
        furnace = bot.inventory.findInventoryItem(mcData.itemsByName["furnace"].id);
      }
    }

    // Place the furnace near the player if it's not already placed
    const furnacePosition = bot.entity.position.offset(1, 0, 0);
    const furnaceBlock = bot.blockAt(furnacePosition);
    if (!furnaceBlock || furnaceBlock.name !== "furnace") {
      await placeItem(bot, "furnace", furnacePosition);
    }

    // Smelt the raw iron using the furnace and coal as fuel
    if (rawIron) {
      await smeltItem(bot, "raw_iron", "coal", rawIron.count);
      ironIngots = bot.inventory.findInventoryItem(mcData.itemsByName["iron_ingot"].id);
    }
  }

  // Check if there is a crafting table nearby or in the inventory
  let craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName["crafting_table"].id);
  if (!craftingTable) {
    craftingTable = bot.findBlock({
      matching: mcData.blocksByName["crafting_table"].id,
      maxDistance: 32
    });
    if (!craftingTable) {
      // Craft a crafting table using oak planks
      await craftItem(bot, "crafting_table", 1);
    }
  }

  // Place the crafting table near the player if it's not already placed
  const tablePosition = bot.entity.position.offset(1, 0, 0);
  const tableBlock = bot.blockAt(tablePosition);
  if (!tableBlock || tableBlock.name !== "crafting_table") {
    await placeItem(bot, "crafting_table", tablePosition);
  }

  // Craft iron leggings using the crafting table and 7 iron ingots
  await craftItem(bot, "iron_leggings", 1);
  bot.chat("Iron leggings crafted.");
}