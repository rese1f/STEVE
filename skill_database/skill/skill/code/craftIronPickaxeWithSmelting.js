async function craftIronPickaxeWithSmelting(bot) {
  // Check if there are enough iron ingots in the inventory
  let ironIngots = bot.inventory.findInventoryItem(mcData.itemsByName["iron_ingot"].id);
  if (!ironIngots || ironIngots.count < 3) {
    // Mine one more iron ore
    await mineBlock(bot, "iron_ore", 1);
  }

  // Check if there is a furnace in the inventory or nearby
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

  // Smelt the iron ore using the furnace and coal as fuel
  await smeltItem(bot, "raw_iron", "coal", 1);
  ironIngots = bot.inventory.findInventoryItem(mcData.itemsByName["iron_ingot"].id);

  // Check if there are enough sticks in the inventory
  let sticks = bot.inventory.findInventoryItem(mcData.itemsByName["stick"].id);
  if (!sticks || sticks.count < 2) {
    // Craft an extra stick using wooden planks
    await craftItem(bot, "stick", 1);
    sticks = bot.inventory.findInventoryItem(mcData.itemsByName["stick"].id);
  }

  // Check if there is a crafting table in the inventory or nearby
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

  // Craft an iron pickaxe using the crafting table, 3 iron ingots, and 2 sticks
  await craftItem(bot, "iron_pickaxe", 1);
  bot.chat("Iron pickaxe crafted.");
}