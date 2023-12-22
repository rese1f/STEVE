async function obtainOakLogs(bot) {
  const oakLogName = "oak_log";
  const oakLogItem = bot.inventory.findInventoryItem(mcData.itemsByName[oakLogName].id);
  if (oakLogItem && oakLogItem.count >= 3) {
    bot.chat("Already have 3 oak logs in inventory.");
    return;
  }
  const logsNeeded = oakLogItem ? 3 - oakLogItem.count : 3;
  bot.chat(`Mining ${logsNeeded} oak logs...`);
  await mineBlock(bot, oakLogName, logsNeeded);
  bot.chat("Obtained 3 oak logs.");
}