/**
 Exploration game state
 
 */

import { bitfont_render } from "../game/bitfont.js"
import { mazemap_render } from "./mazemap.js"
import { tileset_background } from "./tileset.js" 

console.log("js/modules/explore.js");
// var explore = new Object();
// explore.encounter_chance = 0;
// explore.encounter_increment = .05;
// explore.encounter_max = .30;
// explore.message = "";

// // found items for rendering
// explore.treasure_id = 0;
// explore.gold_value = 0;

/**
 * Exploration
 * The hero's basic movement happens here
 * Also most other game states trigger from here
 * and completed states usually return here.
 */
export function explore_logic() {
  GLOBAL.EXPLORE.message = "";

  avatar_explore();
	
  // check map exit
  if (GLOBAL.AVATAR.moved) {
    if (mazemap_check_exit()) {
	
	  // display the name of the new map
	  GLOBAL.EXPLORE.message = atlas.maps[mazemap.current_id].name;
	  
	  // don't allow a random encounter when switching maps
      avatar_save();
	  return;
	}
  }  
  
  // check shop
  if (GLOBAL.AVATAR.moved) {
    if (mazemap_check_shop()) {
      gamestate = STATE_DIALOG;
      redraw = true;
      avatar_save();
      return;
    }
  }

  // check special script;
  if (GLOBAL.AVATAR.moved) {
    if (mapscript_exec(mazemap.current_id)) {
      avatar_save();
      return;
    }
  }

  // check random encounter
  var enemy_options = atlas.maps[mazemap.current_id].enemies.length;
  // console.log("hi there");
  // console.log(atlas)
  
  if (GLOBAL.AVATAR.moved && enemy_options > 0) {

    if (Math.random() < GLOBAL.EXPLORE.encounter_chance) {
      GLOBAL.EXPLORE.encounter_chance = 0.0;
      gamestate = STATE_COMBAT;
      action.select_pos = BUTTON_POS_ATTACK;
      combat.timer = COMBAT_INTRO_DELAY;
	  combat.phase = COMBAT_PHASE_INTRO;

      // choose an enemy randomly from the list for this map
      var enemy_roll = Math.floor(Math.random() * enemy_options);
      var enemy_id = atlas.maps[mazemap.current_id].enemies[enemy_roll];
	  combat_set_enemy(enemy_id);

      return;
    }
    else {
      GLOBAL.EXPLORE.encounter_chance += GLOBAL.EXPLORE.encounter_increment;
      GLOBAL.EXPLORE.encounter_chance = Math.min(GLOBAL.EXPLORE.encounter_chance, GLOBAL.EXPLORE.encounter_max);
    }
  }
  
  // check opening info screen (keyboard)
  if (pressing.action && !input_lock.action) {
    gamestate = STATE_INFO;
	input_lock.action = true;
	redraw = true;
    action.select_pos = BUTTON_POS_INFO;
	info_clear_messages();
    sounds_play(SFX_CLICK);
    return;
  }
  
  // check opening info screen (mouse)
  if (pressing.mouse && !input_lock.mouse && isWithin(mouse_pos, BUTTON_POS_INFO)) {
    gamestate = STATE_INFO;
	input_lock.mouse = true;
	redraw = true;
    action.select_pos = BUTTON_POS_INFO;
	info_clear_messages();
	sounds_play(SFX_CLICK);
    return;
  }

}


export function explore_render() {

  tileset_background();
  mazemap_render(GLOBAL.AVATAR.x, GLOBAL.AVATAR.y, GLOBAL.AVATAR.facing);

  // HUD elements
  // direction
  bitfont_render(GLOBAL.AVATAR.facing, 80, 2, "center");
  
  info_render_button();

  if (OPTIONS.minimap) {
    minimap_render();
  }
    
  // if there is treasure to display, put the message higher
  if (GLOBAL.EXPLORE.gold_value > 0 || GLOBAL.EXPLORE.treasure_id > 0) {
    bitfont_render(GLOBAL.EXPLORE.message, 80, 70, "center");  
  }
  else {
    bitfont_render(GLOBAL.EXPLORE.message, 80, 100, "center");    
  }
  
  // if a map event has rewarded gold to the player
  // display it on the ground here
  if (GLOBAL.EXPLORE.gold_value > 0) {
    treasure_render_gold(GLOBAL.EXPLORE.gold_value);
    GLOBAL.EXPLORE.gold_value = 0;    
  }
  
  // display treasure on the ground
  if (GLOBAL.EXPLORE.treasure_id > 0) {
    treasure_render_item(GLOBAL.EXPLORE.treasure_id);
    GLOBAL.EXPLORE.treasure_id = 0;
  }
}
