async function craftIronHelmet(bot) {
  // Check if there are enough iron ingots in the inventory
  let ironIngots = bot.inventory.findInventoryItem(mcData.itemsByName["iron_ingot"].id);
  if (!ironIngots || ironIngots.count < 5) {
    const chestPosition = new Vec3(-17, 1, 17);
    await getItemFromChest(bot, chestPosition, {
      "iron_ingot": 5 - (ironIngots ? ironIngots.count : 0)
    });
    ironIngots = bot.inventory.findInventoryItem(mcData.itemsByName["iron_ingot"].id);
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

  // Craft an iron helmet using the crafting table and 5 iron ingots
  await craftItem(bot, "iron_helmet", 1);
  bot.chat("Iron helmet crafted.");
}