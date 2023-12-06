async function openChestAtPosition(bot) {
  const chestPosition = new Vec3(-20, -16, 35);
  await moveToChest(bot, chestPosition);
  const chestBlock = bot.blockAt(chestPosition);
  await bot.openContainer(chestBlock);
  await closeChest(bot, chestBlock);
  bot.chat("Chest opened.");
}