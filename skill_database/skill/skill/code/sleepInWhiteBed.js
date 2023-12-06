async function sleepInWhiteBed(bot) {
  // Find a suitable position to place the bed
  const startPosition = bot.entity.position.floored();
  const bedPosition = await findSuitablePosition(bot, startPosition);

  // Place the white bed at the suitable position
  if (bedPosition) {
    await placeItem(bot, "white_bed", bedPosition);
  } else {
    bot.chat("Cannot find a suitable position to place the bed.");
    return;
  }

  // Sleep in the bed
  const bedBlock = bot.blockAt(bedPosition);
  await bot.sleep(bedBlock);
  bot.chat("Slept in the white bed.");
}