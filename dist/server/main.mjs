import { expressServer } from "@rpgjs/server/express";
import * as url from "url";
import { Components, Control, EventData, RpgEvent, RpgModule } from "@rpgjs/server";
const client$3 = null;
const _main_worlds_myworldworld = { "maps": [{ "fileName": "maps/simplemap.tmx", "height": 640, "width": 800, "x": 64, "y": -160 }, { "fileName": "maps/simplemap2.tmx", "height": 640, "width": 640, "x": -160, "y": 480 }], "onlyShowAdjacentMaps": false, "type": "world", "basePath": "main/worlds", "id": "5547825a2b518883c4727f9a18704206" };
const player = {
  onConnected(player2) {
    player2.name = "Player";
    player2.setComponentsTop(Components.text("{name}"));
  },
  onInput(player2, {
    input
  }) {
    if (input == Control.Back) {
      player2.callMainMenu();
    }
  },
  async onJoinMap(player2) {
    if (player2.getVariable("AFTER_INTRO")) {
      return;
    }
    await player2.showText("Welcome to my Portfolio World!");
    player2.setVariable("AFTER_INTRO", true);
  }
};
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
let VillagerEvent = class extends RpgEvent {
  onInit() {
    this.setGraphic("female");
  }
  async onAction(player2) {
    await player2.showText("suppp", {
      talkWith: this
    });
    player2.gold += 10;
  }
};
VillagerEvent = __decorateClass$1([EventData({
  name: "EV-1",
  hitbox: {
    width: 32,
    height: 16
  }
})], VillagerEvent);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
const _lastConnectedCb = player.onConnected;
player.onConnected = async (player2) => {
  if (_lastConnectedCb)
    await _lastConnectedCb(player2);
  if (!player2.server.module.customHookExists("server.player.onAuth")) {
    player2.setGraphic("hero");
    player2.setHitbox(16, 16);
    await player2.changeMap("simplemap");
  }
};
let RpgServerModuleEngine = class {
};
RpgServerModuleEngine = __decorateClass([
  RpgModule({
    player,
    events: [VillagerEvent],
    database: [],
    maps: [],
    worldMaps: [_main_worlds_myworldworld]
  })
], RpgServerModuleEngine);
const _main = {
  client: client$3,
  server: RpgServerModuleEngine
};
const client$2 = null;
const _rpgjs_mobile_gui = {
  client: client$2
};
const client$1 = null;
const _rpgjs_default_gui = {
  client: client$1
};
const client = null;
const _rpgjs_gamepad = {
  client
};
const modules = [
  _main,
  _rpgjs_mobile_gui,
  _rpgjs_default_gui,
  _rpgjs_gamepad
];
const globalConfig = { "startMap": "simplemap", "start": { "map": "simplemap", "graphic": "hero", "hitbox": [16, 16] }, "compilerOptions": { "build": {} }, "name": "My Game" };
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
expressServer(modules, {
  globalConfig,
  basePath: __dirname,
  envs: {
    VITE_BUILT: 1,
    VITE_SERVER_URL: void 0,
    VITE_RPG_TYPE: "mmorpg",
    VITE_ASSETS_PATH: ""
  }
});
