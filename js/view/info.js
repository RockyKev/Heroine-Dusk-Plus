/**
 Info Game State
 Display information about the heroine
 */

import { bitfont_render } from "../game/bitfont.js"

console.log("js/view/info.js")

// consts
var AVATAR_SPRITE_W = 80;
var AVATAR_SPRITE_H = 100;
var AVATAR_DRAW_X = 40;
var AVATAR_DRAW_Y = 20;
var TYPE_ARMOR = 0;
var TYPE_WEAPON = 1;


// class info
// TODO: move this to global
// var info = new Object();

// image setup
GLOBAL.INFO.avatar_img = new Image();
GLOBAL.INFO.avatar_img_loaded = false;
GLOBAL.INFO.button_img = new Image();
GLOBAL.INFO.button_img_loaded = false;

GLOBAL.INFO.weapons = new Array();
GLOBAL.INFO.armors = new Array();
GLOBAL.INFO.spells = new Array();

GLOBAL.INFO.power_action = "";
GLOBAL.INFO.power_result = "";

// This seems really wrong
/*** Initialize **********************/
export function info_init() {

  GLOBAL.INFO.avatar_img.src = "images/interface/heroine.png";
  GLOBAL.INFO.avatar_img.onload = function() {info_avatar_onload();};
  GLOBAL.INFO.button_img.src = "images/interface/info_button.png";
  GLOBAL.INFO.button_img.onload = function() {info_button_onload();};
  
  GLOBAL.INFO.weapons[0] = {name:"Bare Fists",  atk_min:1,  atk_max:4,  gold:0};
  GLOBAL.INFO.weapons[1] = {name:"Wood Stick",  atk_min:2,  atk_max:6,  gold:0};
  GLOBAL.INFO.weapons[2] = {name:"Iron Knife",  atk_min:3,  atk_max:8,  gold:50};
  GLOBAL.INFO.weapons[3] = {name:"Bronze Mace", atk_min:4,  atk_max:10, gold:200};
  GLOBAL.INFO.weapons[4] = {name:"Steel Sword", atk_min:5,  atk_max:12, gold:1000};
  GLOBAL.INFO.weapons[5] = {name:"War Hammer",  atk_min:6,  atk_max:14, gold:5000};
  GLOBAL.INFO.weapons[6] = {name:"Battle Axe",  atk_min:7,  atk_max:16, gold:20000};
  GLOBAL.INFO.weapons[7] = {name:"Great Sword", atk_min:8,  atk_max:18, gold:100000};
  
  GLOBAL.INFO.armors[0] = {name:"No Armor",      def:0,  gold:0};
  GLOBAL.INFO.armors[1] = {name:"Serf Rags",     def:2,  gold:0};
  GLOBAL.INFO.armors[2] = {name:"Travel Cloak",  def:4,  gold:50};
  GLOBAL.INFO.armors[3] = {name:"Hide Cuirass",  def:6,  gold:200};
  GLOBAL.INFO.armors[4] = {name:"Rivet Leather", def:8,  gold:1000};
  GLOBAL.INFO.armors[5] = {name:"Chain Maille",  def:10, gold:5000};
  GLOBAL.INFO.armors[6] = {name:"Plate Armor",   def:12, gold:20000};
  GLOBAL.INFO.armors[7] = {name:"Wyvern Scale",  def:14, gold:100000};
  
  GLOBAL.INFO.spells[0] = {name:"No Spell", gold:0};
  GLOBAL.INFO.spells[1] = {name:"Heal", gold:0};
  GLOBAL.INFO.spells[2] = {name:"Burn", gold:100};
  GLOBAL.INFO.spells[3] = {name:"Unlock", gold:500};
  GLOBAL.INFO.spells[4] = {name:"Light", gold:2500};
  GLOBAL.INFO.spells[5] = {name:"Freeze", gold:10000};
  GLOBAL.INFO.spells[6] = {name:"Reflect", gold:50000};
  
} 

/*** Image loading Helpers **********************/
function info_avatar_onload() {GLOBAL.INFO.avatar_img_loaded = true;}
function info_button_onload() {GLOBAL.INFO.button_img_loaded = true;}


/*** Logic Functions **********************/
function info_logic() {

  // check key to info screen
  if (pressing.action && !input_lock.action && action.select_pos == BUTTON_POS_INFO) {
    GLOBAL.STATE.gamestate = STATE_EXPLORE;
	input_lock.action = true;	
	redraw = true;
    sounds_play(SFX_CLICK);
  }

  // check click to close info screen
  if (pressing.mouse && !input_lock.mouse && isWithin(mouse_pos, BUTTON_POS_INFO)) {
    GLOBAL.STATE.gamestate = STATE_EXPLORE;
	input_lock.mouse = true;
	redraw = true;  
	sounds_play(SFX_CLICK);
  }

  // check select movement for spell actions
  action_logic();
  
  // check power usage
  
  if (action_checkuse(BUTTON_POS_HEAL) && GLOBAL.AVATAR.mp > 0 && GLOBAL.AVATAR.spellbook >= 1) {
    power_heal();
	redraw = true;
  }

  if (action_checkuse(BUTTON_POS_BURN) && GLOBAL.AVATAR.mp > 0 && GLOBAL.AVATAR.spellbook >= 2) {
    power_map_burn();
    redraw = true;
  }
  
  if (action_checkuse(BUTTON_POS_UNLOCK) && GLOBAL.AVATAR.mp > 0 && GLOBAL.AVATAR.spellbook >= 3) {
    power_map_unlock();
    redraw = true;
  }

}

function info_clear_messages() {
  GLOBAL.INFO.power_action = "";
  GLOBAL.INFO.power_result = "";
}

/*** Render Functions **********************/
function info_render() {

  tileset_background();
  mazemap_render(GLOBAL.AVATAR.x, GLOBAL.AVATAR.y, GLOBAL.AVATAR.facing);
 
  bitfont_render("INFO", 80, 2, "center");
  
  if (GLOBAL.AVATAR.spellbook > 0) {
    bitfont_render("Spells", 158, 30, "right");
  }

  info_render_equipment();
  info_render_button();
  info_render_itemlist();
  info_render_hpmp();
  info_render_gold();
  action_render();
  
  if (!info_render_messages()) {
  
    // hide the minimap if we need to make room for messages
    minimap_render();
  }

}

function info_render_equipment() {
  if (!GLOBAL.INFO.avatar_img_loaded) return;
  
  // always draw the base 
  info_render_equiplayer(0, TYPE_ARMOR);

  // render worn equipment  
  info_render_equiplayer(GLOBAL.AVATAR.armor, TYPE_ARMOR);
  info_render_equiplayer(GLOBAL.AVATAR.weapon, TYPE_WEAPON);
  
}

function info_render_equiplayer(itemtier, itemtype) {

  ctx.drawImage(
    GLOBAL.INFO.avatar_img,
    itemtier * AVATAR_SPRITE_W * GLOBAL.PRESCALE,
    itemtype * AVATAR_SPRITE_H * GLOBAL.PRESCALE,
    AVATAR_SPRITE_W * GLOBAL.PRESCALE,
    AVATAR_SPRITE_H * GLOBAL.PRESCALE,	
    AVATAR_DRAW_X * GLOBAL.SCALE,
    AVATAR_DRAW_Y * GLOBAL.SCALE,
    AVATAR_SPRITE_W * GLOBAL.SCALE,
    AVATAR_SPRITE_H * GLOBAL.SCALE
  );
}

function info_render_itemlist() {
  var item_string;

  // ARMOR  
  item_string = GLOBAL.INFO.armors[GLOBAL.AVATAR.armor].name;
  if (GLOBAL.AVATAR.bonus_def > 0) {
    item_string += " +";
    item_string += GLOBAL.AVATAR.bonus_def;
  }
  bitfont_render(item_string, 2, 65, "left");
  
  // WEAPON
  item_string = GLOBAL.INFO.weapons[GLOBAL.AVATAR.weapon].name;  
  if (GLOBAL.AVATAR.bonus_atk > 0) {
    item_string += " +";
    item_string += GLOBAL.AVATAR.bonus_atk;    
  }  
  bitfont_render(item_string, 2, 75, "left");
  
}

function info_render_hpmp() { 
  bitfont_render("HP " + GLOBAL.AVATAR.hp + "/" + GLOBAL.AVATAR.max_hp, 2, 100, "left");
  bitfont_render("MP " + GLOBAL.AVATAR.mp + "/" + GLOBAL.AVATAR.max_mp, 2, 110, "left"); 
}

function info_render_gold() {
  bitfont_render(GLOBAL.AVATAR.gold + " Gold", 158, 110, "right");
}

function info_render_button() {

  if (!GLOBAL.INFO.button_img_loaded) return;
  
  var button_x;
  
  // show button up on explore, down on info, and hidden any other state
  if (GLOBAL.STATE.gamestate == STATE_EXPLORE) button_x = 0;
  else if (GLOBAL.STATE.gamestate == STATE_INFO) button_x = BUTTON_SIZE;
  else return;
  
  ctx.drawImage(
    GLOBAL.INFO.button_img,
    button_x * GLOBAL.PRESCALE,
    0,
    BUTTON_SIZE * GLOBAL.PRESCALE,
    BUTTON_SIZE * GLOBAL.PRESCALE,	
    (BUTTON_POS_INFO.x + BUTTON_OFFSET) * GLOBAL.SCALE,
    (BUTTON_POS_INFO.y + BUTTON_OFFSET) * GLOBAL.SCALE,
    BUTTON_SIZE * GLOBAL.SCALE,
    BUTTON_SIZE * GLOBAL.SCALE
  );
}

function info_render_messages() {
  var message_displayed = false;

  if (GLOBAL.INFO.power_action != "") {
    bitfont_render(GLOBAL.INFO.power_action, 2, 30, "left");
	message_displayed = true;
  }
  if (GLOBAL.INFO.power_result != "") {
    bitfont_render(GLOBAL.INFO.power_result, 2, 40, "left");
	message_displayed = true;
  }
  return message_displayed;
}
