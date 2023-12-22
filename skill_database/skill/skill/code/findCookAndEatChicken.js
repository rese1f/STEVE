async function findCookAndEatChicken(bot) {
  // Check if the bot has at least 1 cooked chicken in its inventory
  let cookedChicken = bot.inventory.findInventoryItem(mcData.itemsByName["cooked_chicken"].id);
  if (cookedChicken) {
    // Eat the cooked chicken
    await eatCookedChicken(bot);
  } else {
    // Check if there is raw chicken in the inventory or in the nearby chest
    let rawChicken = bot.inventory.findInventoryItem(mcData.itemsByName["chicken"].id);
    if (!rawChicken) {
      const chestPosition = new Vec3(-17, 1, 17);
      await getItemFromChest(bot, chestPosition, {
        "chicken": 1
      });
      rawChicken = bot.inventory.findInventoryItem(mcData.itemsByName["chicken"].id);
    }

    // If there is still no raw chicken, explore the area to find and kill a chicken
    if (!rawChicken) {
      await killMob(bot, "chicken", 300);
      rawChicken = bot.inventory.findInventoryItem(mcData.itemsByName["chicken"].id);
    }

    // Cook the raw chicken into cooked chicken using a furnace
    if (rawChicken) {
      await smeltItem(bot, "chicken", "coal", 1);
      cookedChicken = bot.inventory.findInventoryItem(mcData.itemsByName["cooked_chicken"].id);
    }

    // Eat the cooked chicken if available
    if (cookedChicken) {
      await eatCookedChicken(bot);
    } else {
      bot.chat("No cooked chicken available.");
    }
  }
}