
import { handleKeyDown, handleKeyUp, handleMouseDown, handleMouseUp, handleTouchStart, handleTouchEnd } from "./game/input.js"
import { gamestate_logic, gamestate_render } from "./modules/gamestate.js"

import { enemy_init } from "./game/enemy.js"
import { getCookie, setCookie } from "./game/saveload.js"
import { bitfont_init } from "./game/bitfont.js"
import { tileset_init } from "./modules/tileset.js"
import { mazemap_init } from "./modules/mazemap.js"
import { minimap_init } from "./ui/minimap.js"
import { avatar_init } from "./modules/avatar.js"
import { info_init } from "./view/info.js"
import { action_init } from "./modules/combat_action.js"
import { combat_init } from "./modules/combat.js"
import { dialog_init } from "./modules/dialog.js"
import { boss_init } from "./modules/boss.js"
import { title_init } from "./view/title.js"
import { sounds_init } from "./game/sounds.js"
import { treasure_init } from "./modules/treasure.js"


import { resizeCanvas } from "./modules/utils.js"




// html elements
// var can;     // canvas
// var ctx;     // context
var FPS = 60;

// this style of game doesn't update visually often
// set this flag anytime the render function should update the view
// var redraw = false;
// var GLOBAL.STATE.init_complete = false;

//---- Main Loop --------------------------------------------------

setInterval(function() {
  if (!GLOBAL.STATE.init_complete) return;
  logic();
  render();
}, 1000/FPS);

//---- Logic Function ---------------------------------------------

function logic() {
  gamestate_logic();
}

//---- Render Function ---------------------------------------------

function render() {

  // only render if something has changed
  if (!GLOBAL.STATE.redraw) return;
  
  GLOBAL.STATE.redraw = false;
  
  gamestate_render();
}

//---- Init Function -----------------------------------------------

function init() {

  // TODO: name this correctly 
  // can = document.getElementById("gamecanvas");
  // if (can.getContext) {
  //   ctx = can.getContext("2d");
  // }
  
  console.log("main init")
  const newResizeCanvas = resizeCanvas(window.GLOBAL, can); // missing

  can.width = newResizeCanvas.width;
  can.height = newResizeCanvas.height;
  GLOBAL.STATE.redraw = newResizeCanvas.redraw;
  GLOBAL.SCALE = newResizeCanvas.scale;

  if (newResizeCanvas.makeSmooth) {
    ctx.imageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.oImageSmoothingEnabled = false;  
  }

  
  if (window.addEventListener) {
    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);
    window.addEventListener('mousedown', handleMouseDown, true);
    window.addEventListener('mouseup', handleMouseUp, true);
    window.addEventListener('touchstart', handleTouchStart, true);
    window.addEventListener('touchend', handleTouchEnd, true);
    window.addEventListener('resize', resizeCanvas, false);
    window.addEventListener('orientationchange', resizeCanvas, false);
  }

  // TODO: change to localState
  // load some user preferences
  var json_save = getCookie("options");
  if (json_save != null) {
    OPTIONS = JSON.parse(json_save);
  }

  // TODO: Explain what all of these are. Potentially turn this into ES Modules
  console.log("im here now")
  // initialize all game units
  bitfont_init();
  tileset_init();
  mazemap_init(); // this is the map generator. stupid name.
  info_init();
  minimap_init();
  avatar_init();
  action_init();
  enemy_init();
  combat_init();
  dialog_init();
  boss_init();
  title_init();
  sounds_init();
  treasure_init();

  GLOBAL.STATE.init_complete = true;
}

//---- Run Game -----------------------------------------------

init();