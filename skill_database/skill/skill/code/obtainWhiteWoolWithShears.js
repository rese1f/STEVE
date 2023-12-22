async function obtainWhiteWoolWithShears(bot) {
  // Equip the shears
  const shears = bot.inventory.findInventoryItem(mcData.itemsByName["shears"].id);
  await bot.equip(shears, "hand");

  // Find the nearest sheep
  const sheep = bot.nearestEntity(entity => {
    return entity.name === "sheep" && entity.position.distanceTo(bot.entity.position) < 32;
  });

  // Use the shears on the sheep to obtain white wool
  if (sheep) {
    await bot.useOn(sheep);
    bot.chat("Obtained white wool using shears.");
  } else {
    bot.chat("No sheep found nearby.");
  }
}