async function smeltIronOre(bot) {
  // Find a suitable location to place the furnace
  const furnacePosition = bot.entity.position.offset(1, 0, 0);

  // Place the furnace at the chosen location
  await placeItem(bot, "furnace", furnacePosition);

  // Smelt 1 raw_iron into 1 iron_ingot using 1 coal as fuel
  await smeltItem(bot, "raw_iron", "coal", 1);
  bot.chat("1 iron ore smelted.");
}