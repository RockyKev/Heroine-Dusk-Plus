/**
 Maze Avatar
 **/

import { getCookie, setCookie } from "../game/saveload.js";
import { mazemap_set } from "./mazemap.js";

// var avatar = new Object();
GLOBAL.AVATAR.campaign = new Array();
GLOBAL.AVATAR.avatar_continue = false;

//---- Public Functions ---------------------------------------------
export function avatar_init() {

  // check save games
  var json_save = getCookie("mazesave");
  if (json_save != null) {
    GLOBAL.AVATAR = JSON.parse(json_save);

    if (GLOBAL.AVATAR.hp > 0) {

      // normal continue
      mazemap_set(GLOBAL.AVATAR.map_id);
      GLOBAL.AVATAR.avatar_continue = true;
    }
    else if (GLOBAL.AVATAR.sleeploc) {
      avatar_respawn();
	  GLOBAL.AVATAR.avatar_continue = true;
    }
    else {
      avatar_reset();
      mazemap_set(GLOBAL.AVATAR.map_id); 
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
  GLOBAL.AVATAR.x = 1;
  GLOBAL.AVATAR.y = 1;
  GLOBAL.AVATAR.facing = "south";
  GLOBAL.AVATAR.moved = false;
  GLOBAL.AVATAR.map_id = 0;
  GLOBAL.AVATAR.weapon = 0;
  GLOBAL.AVATAR.armor = 1;
  GLOBAL.AVATAR.hp = 25;
  GLOBAL.AVATAR.max_hp = 25;
  GLOBAL.AVATAR.mp = 4;
  GLOBAL.AVATAR.max_mp = 4;
  GLOBAL.AVATAR.gold = 0;
  GLOBAL.AVATAR.bonus_atk = 0;
  GLOBAL.AVATAR.bonus_def = 0;
  GLOBAL.AVATAR.spellbook = 0;
  GLOBAL.AVATAR.sleeploc = [0,1,1]; // map_id, x, y
  GLOBAL.AVATAR.campaign = new Array();
}

/**
 * Sleeping restores HP and MP and sets the respawn point
 */
function avatar_sleep() {
  GLOBAL.AVATAR.hp = GLOBAL.AVATAR.max_hp;
  GLOBAL.AVATAR.mp = GLOBAL.AVATAR.max_mp;
  GLOBAL.AVATAR.sleeploc = [mazemap.current_id, GLOBAL.AVATAR.x, GLOBAL.AVATAR.y];
}

function avatar_respawn() {
  // previously died. restart at last sleep point
  mazemap_set(GLOBAL.AVATAR.sleeploc[0]);
  GLOBAL.AVATAR.x = GLOBAL.AVATAR.sleeploc[1];
  GLOBAL.AVATAR.y = GLOBAL.AVATAR.sleeploc[2];
  
  GLOBAL.AVATAR.hp = GLOBAL.AVATAR.max_hp;
  GLOBAL.AVATAR.mp = GLOBAL.AVATAR.max_mp;
  
  // cost of death: lose all gold
  GLOBAL.AVATAR.gold = 0;
}

function avatar_explore() {
  GLOBAL.AVATAR.moved = false;

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
    
    if (GLOBAL.AVATAR.facing == "north") avatar_move(0,-1);
    else if (GLOBAL.AVATAR.facing == "west") avatar_move(-1,0);
    else if (GLOBAL.AVATAR.facing == "south") avatar_move(0,1);
    else if (GLOBAL.AVATAR.facing == "east") avatar_move(1,0);
  }
  else if (input_down) {
    if (pressing.down) input_lock.down = true;
    if (pressing.mouse) input_lock.mouse = true;
    
    if (GLOBAL.AVATAR.facing == "north") avatar_move(0,1);
    else if (GLOBAL.AVATAR.facing == "west") avatar_move(1,0);
    else if (GLOBAL.AVATAR.facing == "south") avatar_move(0,-1);
    else if (GLOBAL.AVATAR.facing == "east") avatar_move(-1,0);
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
  var target_tile = mazemap_get_tile(GLOBAL.AVATAR.x+dx,GLOBAL.AVATAR.y+dy);
  if (tileset.walkable[target_tile]) {
    GLOBAL.AVATAR.x += dx;
    GLOBAL.AVATAR.y += dy;
    redraw = true;
    GLOBAL.AVATAR.moved = true;
    avatar_save();
  }
  else {
    sounds_play(SFX_BLOCKED);  
  }
}

function avatar_turn_left() {
  if (GLOBAL.AVATAR.facing == "north") GLOBAL.AVATAR.facing = "west";
  else if (GLOBAL.AVATAR.facing == "west") GLOBAL.AVATAR.facing = "south";
  else if (GLOBAL.AVATAR.facing == "south") GLOBAL.AVATAR.facing = "east";
  else if (GLOBAL.AVATAR.facing == "east") GLOBAL.AVATAR.facing = "north";
  redraw = true;
  avatar_save();

}

function avatar_turn_right() {
  if (GLOBAL.AVATAR.facing == "north") GLOBAL.AVATAR.facing = "east";
  else if (GLOBAL.AVATAR.facing == "east") GLOBAL.AVATAR.facing = "south";
  else if (GLOBAL.AVATAR.facing == "south") GLOBAL.AVATAR.facing = "west";
  else if (GLOBAL.AVATAR.facing == "west") GLOBAL.AVATAR.facing = "north";
  redraw = true;
  avatar_save();
}

// TODO: Change this to is_avatar_badly_hurt
function avatar_badly_hurt() {
  if (GLOBAL.AVATAR.hp <= GLOBAL.AVATAR.max_hp/3) return true;
  return false;
}

