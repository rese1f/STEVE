async function craftIronSwordWithChest(bot) {
  // Check if there are enough iron ingots and sticks in the inventory
  let ironIngots = bot.inventory.findInventoryItem(mcData.itemsByName["iron_ingot"].id);
  let sticks = bot.inventory.findInventoryItem(mcData.itemsByName["stick"].id);

  // If not, get the required items from the chest
  if (!ironIngots || ironIngots.count < 2 || !sticks || sticks.count < 1) {
    const chestPosition = new Vec3(-17, 1, 17);
    await getItemFromChest(bot, chestPosition, {
      "iron_ingot": 2,
      "stick": 1
    });
    ironIngots = bot.inventory.findInventoryItem(mcData.itemsByName["iron_ingot"].id);
    sticks = bot.inventory.findInventoryItem(mcData.itemsByName["stick"].id);
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

  // Craft an iron sword using the crafting table, 2 iron ingots, and 1 stick
  await craftItem(bot, "iron_sword", 1);
  bot.chat("Iron sword crafted.");
}