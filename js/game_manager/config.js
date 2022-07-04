/**
 Various config options to help deployment to different platforms.
 */

console.log("js/game_manager/config.js");

// TODO: figure out how to make this unsuck
var can;     // canvas
var ctx;     // context

can = document.getElementById("gamecanvas");
if (can.getContext) {
  ctx = can.getContext("2d");
}


// TODO: Call this a global config or change to strings
var STATE_EXPLORE = 0;
var STATE_COMBAT = 1;
var STATE_INFO = 2;
var STATE_DIALOG = 3;
var STATE_TITLE = 4; 

// TODO: Roll this into a global config
var DIALOG_BUTTON_NONE = 0;
var DIALOG_BUTTON_BUY = 1;
var DIALOG_BUTTON_EXIT = 2;

var BUTTON_POS_OPT0 = {x:0, y:60, w:20, h:20};
var BUTTON_POS_OPT1 = {x:0, y:80, w:20, h:20};
var BUTTON_POS_OPT2 = {x:0, y:100, w:20, h:20};

//---- Key States ---------------------------------------------------

var pressing = new Object();
pressing.up = false;
pressing.down = false;
pressing.left = false;
pressing.right = false;
pressing.action = false;
pressing.mouse = false;

var input_lock = new Object();
input_lock.up = false;
input_lock.down = false;
input_lock.left = false;
input_lock.right = false;
input_lock.action = false;
input_lock.mouse = false;

var mouse_pos = {x:0, y:0};

//---- Key Bindings -------------------------------------------------

var KEYCODE_UP     = 38; // arrow up
var KEYCODE_DOWN   = 40; // arrow down
var KEYCODE_LEFT   = 37; // arrow left
var KEYCODE_RIGHT  = 39; // arrow right
var KEYCODE_ACTION = 32; // space

// secondary
var ALTCODE_UP     = 87; // w
var ALTCODE_DOWN   = 83; // s
var ALTCODE_LEFT   = 65; // a
var ALTCODE_RIGHT  = 68; // d
var ALTCODE_ACTION = 13; // enter

// BITFONT
var bitfont = new Object();

window.GLOBAL = {
  VIEW_WIDTH: 160,
  VIEW_HEIGHT: 120,
  PRESCALE: 1,
  SCALE: 1,
  STRETCH_TO_SCREEN: true,
  OPTIONS: {
    animation: true,
    music: true,
    sfx: true,
    minimap: false
  },
  STATE: {
    redraw: false,
    init_complete: false,
    gamestate: STATE_TITLE,
    bg_music: ""
  },
  AVATAR: {}, // TODO: add entire bit
  EXPLORE: {
    encounter_chance: 0,
    encounter_increment: .05,
    encounter_max: .30,
    message: "",
    treasure_id: 0,    
    gold_value: 0
  },
  ENEMY_POWER: {
    attack: 0,
    scorch: 1,
    hpdrain: 2,
    mpdrain: 3
  },
  INFO: {},
  DIALOG: {},
}

// var ENEMY_POWER_ATTACK = 0;
// var ENEMY_POWER_SCORCH = 1;
// var ENEMY_POWER_HPDRAIN = 2;
// var ENEMY_POWER_MPDRAIN = 3;

// explore.encounter_chance = 0;
// explore.encounter_increment = .05;
// explore.encounter_max = .30;
// explore.message = "";

// found items for rendering
// explore.treasure_id = 0;
// explore.gold_value = 0;

// var VIEW_WIDTH = 160;
// var VIEW_HEIGHT = 120;

// PRESCALE
// The art has been prescaled by this factor.
// PRESCALE 1 means the default 160x120 assets are used in the image folder.
// e.g. PRESCALE 4 means the image folder has been replaced with the 640x480 prescaled assets.
// var PRESCALE = 1;

// SCALE
// The output should be scaled to the following multiple of 160x120
// If STRETCH_TO_SCREEN is enabled, this output scale is recalculated for the current window size
// If STRETCH_TO_SCREEN is disabled, specify a custom output scale here.
// var SCALE = 1;

// STRETCH_TO_SCREEN
// If disabled, the display won't scale any images (it will simply display PRESCALEd data).
// var STRETCH_TO_SCREEN = true;

// user options that can be set from the main menu
// var OPTIONS = new Object();
// OPTIONS.animation = true;
// OPTIONS.music = true;
// OPTIONS.sfx = true;

// var OPTIONS = {
//   animation: true,
//   music: true,
//   sfx: true 
// }

