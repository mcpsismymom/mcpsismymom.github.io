$( document ).ready( async function() {
  await state.init();
  await deployment.init();
  await webadd.init();
  await sync.init();
  //await webext.init();
  await settings.init();
  await size.popup();
  await asset_manager.init();
  await weapon_manager.init();
  await scorekeeper.init();
  await upgrades.init();
  await energy.init();
  await daily_gift.init();
  await dagger_selection.init();
  await news.init();
  
  await start.init();
  await controls.init();
  await story.init();
  await update.init();
  await popup.init();
  await audio.init();



  console.log("boot done..");
  state.set("main_menu");


});
