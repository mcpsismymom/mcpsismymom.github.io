$( document ).ready( async function() {
  await state.init();
  await deployment.init();
  await join_params.init();
  await webadd.init();
  
  if (window.fire == null) {
    window.fire = async (a,b) => {};
  }

  await fire("wait_for_login");
  await fire("set_game_id", ["orev"]);
  await fire("presence");
  await fire("alter_game_ui");

  await sync.init();

  //await webext.init();
  
  await size.popup();
  await settings.init();
  await asset_manager.init();
  await scorekeeper.init();
  await news.init();
  
  await start.init();
  await controls.init();
  await story.init();
  await update.init();
  await popup.init();
  await rolling.init();
  await audio.init();

  await join_params.open_destination();

  console.log("boot done..");

});
