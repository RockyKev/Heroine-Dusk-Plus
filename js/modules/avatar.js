/**
 Maze Avatar
 **/

import { getCookie, setCookie } from "../game/saveload.js";
import { mazemap_set } from "./mazemap.js";

// var avatar = new Object();
GLOBALS.AVATAR.campaign = new Array();
GLOBALS.AVATAR.avatar_continue = false;

//---- Public Functions ---------------------------------------------
export function avatar_init() {

  // check save games
  var json_save = getCookie("mazesave");
  if (json_save != null) {
    GLOBALS.AVATAR = JSON.parse(json_save);

    if (GLOBALS.AVATAR.hp > 0) {

      // normal continue
      mazemap_set(GLOBALS.AVATAR.map_id);
      GLOBALS.AVATAR.avatar_continue = true;
    }
    else if (GLOBALS.AVATAR.sleeploc) {
      avatar_respawn();
	  GLOBALS.AVATAR.avatar_continue = true;
    }
    else {
      avatar_reset();
      mazemap_set(GLOBALS.AVATAR.map_id); 
    }
    return;
  }

  avatar_reset();
}

// TODO :Move this
function avatar_save() {
  var json_save = JSON.stringify(avatar);
  setCookie("mazesave",json_save,90);
}

function avatar_reset() {
  GLOBALS.AVATAR.x = 1;
  GLOBALS.AVATAR.y = 1;
  GLOBALS.AVATAR.facing = "south";
  GLOBALS.AVATAR.moved = false;
  GLOBALS.AVATAR.map_id = 0;
  GLOBALS.AVATAR.weapon = 0;
  GLOBALS.AVATAR.armor = 1;
  GLOBALS.AVATAR.hp = 25;
  GLOBALS.AVATAR.max_hp = 25;
  GLOBALS.AVATAR.mp = 4;
  GLOBALS.AVATAR.max_mp = 4;
  GLOBALS.AVATAR.gold = 0;
  GLOBALS.AVATAR.bonus_atk = 0;
  GLOBALS.AVATAR.bonus_def = 0;
  GLOBALS.AVATAR.spellbook = 0;
  GLOBALS.AVATAR.sleeploc = [0,1,1]; // map_id, x, y
  GLOBALS.AVATAR.campaign = new Array();
}

/**
 * Sleeping restores HP and MP and sets the respawn point
 */
function avatar_sleep() {
  GLOBALS.AVATAR.hp = GLOBALS.AVATAR.max_hp;
  GLOBALS.AVATAR.mp = GLOBALS.AVATAR.max_mp;
  GLOBALS.AVATAR.sleeploc = [mazemap.current_id, GLOBALS.AVATAR.x, GLOBALS.AVATAR.y];
}

function avatar_respawn() {
  // previously died. restart at last sleep point
  mazemap_set(GLOBALS.AVATAR.sleeploc[0]);
  GLOBALS.AVATAR.x = GLOBALS.AVATAR.sleeploc[1];
  GLOBALS.AVATAR.y = GLOBALS.AVATAR.sleeploc[2];
  
  GLOBALS.AVATAR.hp = GLOBALS.AVATAR.max_hp;
  GLOBALS.AVATAR.mp = GLOBALS.AVATAR.max_mp;
  
  // cost of death: lose all gold
  GLOBALS.AVATAR.gold = 0;
}

function avatar_explore() {
  GLOBALS.AVATAR.moved = false;

  var input_up = pressing.up && !input_lock.up;
  var input_down = pressing.down && !input_lock.down;
  var input_left = pressing.left && !input_lock.left;
  var input_right = pressing.right && !input_lock.right;
  
  if (pressing.mouse && !input_lock.mouse) {
    input_up = input_up || (pressing.mouse && !input_lock.mouse && isWithin(mouse_pos, clickarea_up));
    input_down = input_down || (pressing.mouse && !input_lock.mouse && isWithin(mouse_pos, clickarea_down));
    input_left = input_left || (pressing.mouse && !input_lock.mouse && isWithin(mouse_pos, clickarea_left));
    input_right = input_right || (pressing.mouse && !input_lock.mouse && isWithin(mouse_pos, clickarea_right));
  }
  
  // check movement
  if (input_up) {
    if (pressing.up) input_lock.up = true;
    if (pressing.mouse) input_lock.mouse = true;
    
    if (GLOBALS.AVATAR.facing == "north") avatar_move(0,-1);
    else if (GLOBALS.AVATAR.facing == "west") avatar_move(-1,0);
    else if (GLOBALS.AVATAR.facing == "south") avatar_move(0,1);
    else if (GLOBALS.AVATAR.facing == "east") avatar_move(1,0);
  }
  else if (input_down) {
    if (pressing.down) input_lock.down = true;
    if (pressing.mouse) input_lock.mouse = true;
    
    if (GLOBALS.AVATAR.facing == "north") avatar_move(0,1);
    else if (GLOBALS.AVATAR.facing == "west") avatar_move(1,0);
    else if (GLOBALS.AVATAR.facing == "south") avatar_move(0,-1);
    else if (GLOBALS.AVATAR.facing == "east") avatar_move(-1,0);
  }
  else if (input_left) {
    if (pressing.left) input_lock.left = true;
    if (pressing.mouse) input_lock.mouse = true;
    
    avatar_turn_left();
  }
  else if (input_right) {
    if (pressing.right) input_lock.right = true;
    if (pressing.mouse) input_lock.mouse = true;
    
    avatar_turn_right();
  }  
  
}

function avatar_move(dx,dy) {
  var target_tile = mazemap_get_tile(GLOBALS.AVATAR.x+dx,GLOBALS.AVATAR.y+dy);
  if (tileset.walkable[target_tile]) {
    GLOBALS.AVATAR.x += dx;
    GLOBALS.AVATAR.y += dy;
    redraw = true;
    GLOBALS.AVATAR.moved = true;
    avatar_save();
  }
  else {
    sounds_play(SFX_BLOCKED);  
  }
}

function avatar_turn_left() {
  if (GLOBALS.AVATAR.facing == "north") GLOBALS.AVATAR.facing = "west";
  else if (GLOBALS.AVATAR.facing == "west") GLOBALS.AVATAR.facing = "south";
  else if (GLOBALS.AVATAR.facing == "south") GLOBALS.AVATAR.facing = "east";
  else if (GLOBALS.AVATAR.facing == "east") GLOBALS.AVATAR.facing = "north";
  redraw = true;
  avatar_save();

}

function avatar_turn_right() {
  if (GLOBALS.AVATAR.facing == "north") GLOBALS.AVATAR.facing = "east";
  else if (GLOBALS.AVATAR.facing == "east") GLOBALS.AVATAR.facing = "south";
  else if (GLOBALS.AVATAR.facing == "south") GLOBALS.AVATAR.facing = "west";
  else if (GLOBALS.AVATAR.facing == "west") GLOBALS.AVATAR.facing = "north";
  redraw = true;
  avatar_save();
}

// TODO: Change this to is_avatar_badly_hurt
function avatar_badly_hurt() {
  if (GLOBALS.AVATAR.hp <= GLOBALS.AVATAR.max_hp/3) return true;
  return false;
}

