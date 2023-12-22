async function craftWoodenShovel(bot) {
  // Check if there is a crafting table in the inventory
  const craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName["crafting_table"].id);
  if (!craftingTable) {
    // Craft a crafting table using oak logs
    await craftCraftingTable(bot);
  }

  // Place the crafting table near the player
  const tablePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", tablePosition);

  // Check if there are enough oak planks in the inventory
  const oakPlanks = bot.inventory.findInventoryItem(mcData.itemsByName["oak_planks"].id);
  if (!oakPlanks || oakPlanks.count < 2) {
    // Craft oak planks using oak logs
    await craftItem(bot, "oak_planks", 1); // Craft 1 time to get 2 oak planks
  }

  // Check if there are enough sticks in the inventory
  const sticks = bot.inventory.findInventoryItem(mcData.itemsByName["stick"].id);
  if (!sticks || sticks.count < 1) {
    // Craft sticks using oak planks
    await craftItem(bot, "stick", 1);
  }

  // Craft a wooden shovel using oak planks and sticks
  await craftItem(bot, "wooden_shovel", 1);
  bot.chat("Wooden shovel crafted.");
}