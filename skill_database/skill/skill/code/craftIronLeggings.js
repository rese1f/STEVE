async function craftIronLeggings(bot) {
  // Check if there are enough iron ingots in the inventory
  const ironIngots = bot.inventory.findInventoryItem(mcData.itemsByName.iron_ingot.id);
  if (!ironIngots || ironIngots.count < 7) {
    // Mine iron ores
    await mineBlock(bot, "iron_ore", 7 - (ironIngots ? ironIngots.count : 0));

    // Smelt the iron ores to obtain the required iron ingots
    await smeltItem(bot, "raw_iron", "coal", 7 - (ironIngots ? ironIngots.count : 0));
  }

  // Check if there is a crafting table nearby or in the inventory
  let craftingTable = bot.findBlock({
    matching: mcData.blocksByName.crafting_table.id,
    maxDistance: 32
  });

  // If not, place the crafting table from the inventory
  if (!craftingTable) {
    const craftingTableItem = bot.inventory.findInventoryItem(mcData.itemsByName.crafting_table.id);
    if (craftingTableItem) {
      const craftingTablePosition = bot.entity.position.offset(1, 0, 0);
      await placeItem(bot, "crafting_table", craftingTablePosition);
      craftingTable = bot.blockAt(craftingTablePosition);
    } else {
      bot.chat("No crafting table found.");
      return;
    }
  }

  // Craft iron leggings using 7 iron ingots
  await craftItem(bot, "iron_leggings", 1);
  bot.chat("Iron leggings crafted.");
}