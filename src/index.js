import * as PIXI from "pixi.js";
import Client from "./client";
//import Player from "./actor/player";
//import SpiderSpawner from "./spiderSpawner.js";

export const GAME_FPS = 60;

const CLIENT = new Client(document.body);

CLIENT.loader.add("Bug.png", "assets/Bug.png")
  .on("progress", (loader, resource) => {
    console.debug(`Loading: ${loader.progress}%. Loaded ${resource.url}`);
  })
  .load(setupGame);

function setupGame() {
  let map = new PIXI.Graphics();
  map.beginFill(0x6330ff);
  map.drawRect(-305, -305, 300, 300);
  map.endFill();
  map.position.set(CLIENT.view.width, CLIENT.view.height);
  CLIENT.gui.addChild(map);

  //Update velocity accepts no args, so att instance will be ignored
  CLIENT.player.moveSpeed.onChange((att) => {
    //let speed = att.value;
    let h = 0;
    let v = 0;
    //TODO: add controls
    /* eslint-disable curly *//*
    if(actionWest.active)   h -= 1;
    if(actionEast.active)   h += 1;
    if(actionNorth.active)  v -= 1;
    if(actionSouth.active)  v += 1;
    /* eslint-enable */
    CLIENT.player.setVelocity({ x: h, y: v });
  });

  /*let spawner = new SpiderSpawner();
  spawner.pos = {x: 100, y: 100};
  app.stage.addChild(spawner.sprite);

  let actionWest  = new InputAction("player.move.west" , true, {onChange: updateVelocity});
  let actionEast  = new InputAction("player.move.east" , true, {onChange: updateVelocity});
  let actionNorth = new InputAction("player.move.north", true, {onChange: updateVelocity});
  let actionSouth = new InputAction("player.move.south", true, {onChange: updateVelocity});

  function updateVelocity() {
    let speed = player.moveSpeed.value;
    let h = 0;
    let v = 0;
    /* eslint-disable curly *//*
    if(actionWest.active)   h -= 1;
    if(actionEast.active)   h += 1;
    if(actionNorth.active)  v -= 1;
    if(actionSouth.active)  v += 1;
    /* eslint-enable *//*
    let modifier = (h != 0 && v != 0) //Moving in both axes
      ? speed / Math.sqrt(2) //adjust for diagonal movement (currently only 8-directional movement)
      : speed; //Otherwise speed value can be used directly
    player.vel.x = h * modifier;
    player.vel.y = v * modifier;
  }

  /* Test toggling:
  let left  = new Keybind(actionWest , "A", {toggle:true}, "KeyA");
  let right = new Keybind(actionEast , "D", {toggle:true, onup: true}, "KeyD");
  *//*
  new Keybind(actionWest , "A", {}, "KeyA");
  new Keybind(actionEast , "D", {}, "KeyD");
  new Keybind(actionNorth, "W", {}, "KeyW");
  new Keybind(actionSouth, "S", {}, "KeyS");

  // Pointers normalize touch and mouse
  interaction.on("pointerdown", (e) => {
    player.rotationSpeed.addModifier({key: "combatMode", baseMult: 0.5});
    player.moveSpeed.addModifier({key: "combatMode", baseMult: 0.3});
  });
  interaction.on("pointerup", (e) => {
    player.rotationSpeed.removeModifier("combatMode");
    player.moveSpeed.removeModifier("combatMode");
  });*/

  //app.ticker.add(delta => gameLoop(delta));
}
