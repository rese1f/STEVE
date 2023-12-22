async function cookSevenRawPorkchops(bot) {
  // Check if there is a furnace in the inventory or nearby
  let furnace = bot.inventory.findInventoryItem(mcData.itemsByName["furnace"].id);
  if (!furnace) {
    furnace = bot.findBlock({
      matching: mcData.blocksByName["furnace"].id,
      maxDistance: 32
    });
  }

  // Place the furnace near the player if it's not already placed
  const furnacePosition = bot.entity.position.offset(1, 0, 0);
  const furnaceBlock = bot.blockAt(furnacePosition);
  if (!furnaceBlock || furnaceBlock.name !== "furnace") {
    await placeItem(bot, "furnace", furnacePosition);
  }

  // Check if there are 7 raw porkchops in the inventory
  let rawPorkchops = bot.inventory.findInventoryItem(mcData.itemsByName["porkchop"].id);
  if (!rawPorkchops || rawPorkchops.count < 7) {
    // Collect raw porkchops by killing pigs
    const pigsToKill = 7 - (rawPorkchops ? rawPorkchops.count : 0);
    for (let i = 0; i < pigsToKill; i++) {
      await killMob(bot, "pig", 300);
    }
    rawPorkchops = bot.inventory.findInventoryItem(mcData.itemsByName["porkchop"].id);
  }

  // Smelt 7 raw porkchops using coal as fuel
  await smeltItem(bot, "porkchop", "coal", 7);
  bot.chat("7 raw porkchops cooked.");
}