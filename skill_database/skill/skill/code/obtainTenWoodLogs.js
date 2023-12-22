async function obtainTenWoodLogs(bot) {
  const logNames = ["oak_log", "birch_log", "spruce_log", "jungle_log", "acacia_log", "dark_oak_log", "mangrove_log"];
  let totalLogs = 0;

  // Check if there are already 10 wood logs in the inventory
  for (const logName of logNames) {
    const logItem = bot.inventory.findInventoryItem(mcData.itemsByName[logName].id);
    if (logItem) {
      totalLogs += logItem.count;
    }
  }
  if (totalLogs >= 10) {
    bot.chat("Already have 10 wood logs in inventory.");
    return;
  }
  const logsNeeded = 10 - totalLogs;
  bot.chat(`Mining ${logsNeeded} wood logs...`);

  // Equip the wooden axe if available in the inventory
  const woodenAxe = bot.inventory.findInventoryItem(mcData.itemsByName["wooden_axe"].id);
  if (woodenAxe) {
    await bot.equip(woodenAxe, "hand");
  }
  for (let i = 0; i < logsNeeded; i++) {
    // Use exploreUntil to find a wood log if not found nearby
    const logBlock = bot.findBlock({
      matching: block => logNames.includes(block.name),
      maxDistance: 32
    });
    if (!logBlock) {
      await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
        const foundLog = bot.findBlock({
          matching: block => logNames.includes(block.name),
          maxDistance: 32
        });
        return foundLog;
      });
    }

    // Mine the required number of wood logs using mineBlock
    await mineBlock(bot, logBlock.name, 1);
  }
  bot.chat("Obtained 10 wood logs.");
}