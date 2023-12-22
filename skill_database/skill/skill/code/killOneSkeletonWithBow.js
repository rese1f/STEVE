async function killOneSkeletonWithBow(bot) {
  // Check if the bot has a bow and arrows in the inventory
  const bow = bot.inventory.findInventoryItem(mcData.itemsByName["bow"].id);
  const arrows = bot.inventory.findInventoryItem(mcData.itemsByName["arrow"].id);

  // Explore until finding a skeleton
  const skeleton = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const skeleton = bot.nearestEntity(entity => {
      return entity.name === "skeleton" && entity.position.distanceTo(bot.entity.position) < 32;
    });
    return skeleton;
  });
  if (skeleton) {
    if (bow && arrows && arrows.count > 0) {
      // Equip the bow and attack the skeleton from a distance
      await bot.equip(bow, "hand");
      await bot.lookAt(skeleton.position);
      await bot.activateItem();
      bot.chat("Attacked skeleton with bow and arrow.");
    } else {
      // Equip the stone sword and attack the skeleton
      const stoneSword = bot.inventory.findInventoryItem(mcData.itemsByName["stone_sword"].id);
      await bot.equip(stoneSword, "hand");
      await killMob(bot, "skeleton", 300);
      bot.chat("Killed 1 skeleton.");
    }
  } else {
    bot.chat("Could not find a skeleton.");
  }
}