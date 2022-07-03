/**
 Various config options to help deployment to different platforms.
 */

// TODO: Call this a global config
var STATE_EXPLORE = 0;
var STATE_COMBAT = 1;
var STATE_INFO = 2;
var STATE_DIALOG = 3;
var STATE_TITLE = 4; 
 

window.GLOBALS = {
  VIEW_WIDTH: 160,
  VIEW_HEIGHT: 120,
  PRESCALE: 1,
  SCALE: 1,
  STRETCH_TO_SCREEN: true,
  OPTIONS: {
    animation: true,
    music: true,
    sfx: true 
  },
  STATE: {
    redraw: false,
    init_complete: false,
    gamestate: STATE_TITLE,
  },
  AVATAR: {},
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
  }
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

