async function obtainWhiteWoolWithShears(bot) {
  // Equip the shears
  const shears = bot.inventory.findInventoryItem(mcData.itemsByName["shears"].id);
  await bot.equip(shears, "hand");

  // Find the nearest white sheep
  const whiteSheep = bot.nearestEntity(entity => {
    return entity.name === "sheep" && entity.position.distanceTo(bot.entity.position) < 32 && entity.metadata[16] === 0;
  });

  // Use the shears on the white sheep to obtain white wool
  if (whiteSheep) {
    await bot.useOn(whiteSheep);
    bot.chat("Obtained white wool using shears.");
  } else {
    bot.chat("No white sheep found nearby.");
  }
}