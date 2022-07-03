/**
 * Special case function
 * If somehow the player is stuck,
 * Use this from a command console
 */
function stuck() {
  avatar.x = 1;
  avatar.y = 1;
  avatar.facing = "south";
  avatar.moved = false;
  avatar.map_id = 0;
  mazemap_set(0);
  redraw = true;
}

/**
 * Various cheats and debugging routines
 */
function cheat_gold(gold_amt) {
  avatar.gold += gold_amt;
}

function cheat_weapon(weapon_id) {
  if (weapon_id >= 0 && weapon_id <= 7) {
    avatar.weapon = weapon_id;
  }
  redraw = true;
}

function cheat_armor(armor_id) {
  if (armor_id >= 0 && armor_id <= 7) {
    avatar.armor = armor_id;
  }
  redraw = true;
}

function cheat_spell(spell_id) {
  if (spell_id >= 0 && spell_id <= 6) {
    avatar.spellbook = spell_id;
  }
  redraw = true;
}

function cheat_rest() {
  avatar.hp = avatar.max_hp;
  avatar.mp = avatar.max_mp;
  redraw = true;
}