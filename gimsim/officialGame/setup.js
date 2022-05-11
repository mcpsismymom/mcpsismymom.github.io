function reset() {
  localStorage.setItem("gameTime", "10");
  localStorage.setItem("iceChance", "0");
  localStorage.setItem("volumeMain", "100");
  localStorage.setItem("volumeSFX", "100");
  localStorage.setItem("questions", `[["What is 1 + 1?", "2", "1", "3", "4"],
                                      ["What is 1 + 2?", "3", "1", "2", "4"],
                                      ["What is 2 + 2?", "4", "1", "2", "3"]]`);
  localStorage.setItem("alreadySetUp", "yes");

  window.location.reload();
}

if (!localStorage.getItem("alreadySetUp")) reset();