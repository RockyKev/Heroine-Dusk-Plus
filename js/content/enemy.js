/**
 Data collection for Enemies
 Includes the base stats for enemies
 Includes the images for enemies
 */

// TODO: This needs a major refactor
// TODO: Replace with Object.keys(myObj).length;
var ENEMY_COUNT = 8;

console.log("js/content/enemy.js");

const ENEMY = {
  SHADOW_TENDRILS: 0,
  IMP: 1,
  SHADOW_SOUL: 2, 
  ZOMBIE: 3,
  SKELETON: 4,
  DRUID: 5, 
  MIMIC: 6, 
  DEATH_SPEAKER: 7
}

// var ENEMY.SHADOW_TENDRILS = 0;
// var ENEMY_IMP = 1;
// var ENEMY_SHADOW_SOUL = 2;
// var ENEMY_ZOMBIE = 3;
// var ENEMY_SKELETON = 4;
// var ENEMY_DRUID = 5;
// var ENEMY_MIMIC = 6;
// var ENEMY_DEATH_SPEAKER = 7;
const EN_CATEGORY = {
  SHADOW: 0,
  DEMON: 1,
  UNDEAD: 2,
  AUTOMATION: 3
}

// var EN_CATEGORY_SHADOW = 0;
// var EN_CATEGORY_DEMON = 1;
// var EN_CATEGORY_UNDEAD = 2;
// var EN_CATEGORY_AUTOMATON = 3;


// TODO: This is the system
var enemy = new Object();

enemy.load_counter = 0;
enemy.img = new Array();
enemy.img_loaded = false;
enemy.stats = new Array();
enemy.render_offset = {x:0, y:0};

// TODO: This is content
function enemy_init() {
  // TODO: Object.keys(myObj).length;
  for (let i=0; i<ENEMY_COUNT; i++) {
    enemy.img[i] = new Image();
  }

  // load enemy images
  //enemy.img[ENEMY.SHADOW_TENDRILS].src = "images/enemies/shadow_tendrils.png";
   enemy.img[ENEMY.SHADOW_TENDRILS].src = "images/enemies/dq_wyvern.png";
  enemy.img[ENEMY.SHADOW_TENDRILS].onload = function() {enemy_onload();};

  // enemy.img[ENEMY_IMP].src = "images/enemies/imp.png";
   enemy.img[ENEMY.IMP].src = "images/enemies/dq_bat.png";
  enemy.img[ENEMY.IMP].onload = function() {enemy_onload();};

  //enemy.img[ENEMY.SHADOW_SOUL].src = "images/enemies/shadow_soul.png";
   enemy.img[ENEMY.SHADOW_SOUL].src = "images/enemies/dq_shadow.png";
  enemy.img[ENEMY.SHADOW_SOUL].onload = function() {enemy_onload();};

   enemy.img[ENEMY.ZOMBIE].src = "images/enemies/dq_zombie.png";
  //enemy.img[ENEMY.ZOMBIE].src = "images/enemies/zombie.png";
  enemy.img[ENEMY.ZOMBIE].onload = function() {enemy_onload();};

   enemy.img[ENEMY.SKELETON].src = "images/enemies/dq_skeleton.png";  
  //enemy.img[ENEMY.SKELETON].src = "images/enemies/skeleton.png";
  enemy.img[ENEMY.SKELETON].onload = function() {enemy_onload();};

  enemy.img[ENEMY.DRUID].src = "images/enemies/dq_wizard.png";    
  //enemy.img[ENEMY.DRUID].src = "images/enemies/druid.png";
  enemy.img[ENEMY.DRUID].onload = function() {enemy_onload();}

  enemy.img[ENEMY.MIMIC].src = "images/enemies/dq_mimic.png";
  //enemy.img[ENEMY.MIMIC].src = "images/enemies/mimic.png";
  enemy.img[ENEMY.MIMIC].onload = function() {enemy_onload();}

  enemy.img[ENEMY.DEATH_SPEAKER].src = "images/enemies/dq_dark-mage.png";
  // enemy.img[ENEMY.DEATH_SPEAKER].src = "images/enemies/death_speaker.png";
  enemy.img[ENEMY.DEATH_SPEAKER].onload = function() {enemy_onload();}

  // set enemy stats

  enemy.stats[ENEMY.SHADOW_TENDRILS] = {name:"Shadow Tendrils", hp:6, atk_min:2, atk_max:5, gold_min:1, gold_max:2, category:EN_CATEGORY.SHADOW};
  enemy.stats[ENEMY.SHADOW_TENDRILS].powers = [GLOBAL.ENEMY_POWER.attack];

  enemy.stats[ENEMY.IMP] = {name:"Imp", hp:7, atk_min:2, atk_max:6, gold_min:1, gold_max:3, category:EN_CATEGORY.DEMON};
  enemy.stats[ENEMY.IMP].powers = [GLOBAL.ENEMY_POWER.attack, GLOBAL.ENEMY_POWER.attack, GLOBAL.ENEMY_POWER.scorch];

  enemy.stats[ENEMY.SHADOW_SOUL] = {name:"Shadow Soul", hp:8, atk_min:3, atk_max:8, gold_min:2, gold_max:4, category:EN_CATEGORY.SHADOW};
  enemy.stats[ENEMY.SHADOW_SOUL].powers = [GLOBAL.ENEMY_POWER.attack, GLOBAL.ENEMY_POWER.attack, GLOBAL.ENEMY_POWER.mpdrain];

  enemy.stats[ENEMY.ZOMBIE] = {name:"Zombie", hp:12, atk_min:4, atk_max:10, gold_min:3, gold_max:6, category:EN_CATEGORY.UNDEAD};
  enemy.stats[ENEMY.ZOMBIE].powers = [GLOBAL.ENEMY_POWER.attack, GLOBAL.ENEMY_POWER.attack, GLOBAL.ENEMY_POWER.hpdrain];

  enemy.stats[ENEMY.SKELETON] = {name:"Skeleton", hp:18, atk_min:6, atk_max:12, gold_min:5, gold_max:8, category:EN_CATEGORY.UNDEAD};
  enemy.stats[ENEMY.SKELETON].powers = [GLOBAL.ENEMY_POWER.attack];

  enemy.stats[ENEMY.DRUID] = {name:"Druid", hp:16, atk_min:7, atk_max:14, gold_min:7, gold_max:12, category:EN_CATEGORY.DEMON};
  enemy.stats[ENEMY.DRUID].powers = [GLOBAL.ENEMY_POWER.attack, GLOBAL.ENEMY_POWER.scorch, GLOBAL.ENEMY_POWER.hpdrain, GLOBAL.ENEMY_POWER.mpdrain];

  enemy.stats[ENEMY.MIMIC] = {name:"Mimic", hp:30, atk_min:10, atk_max:16, gold_min:16, gold_max:25, category:EN_CATEGORY.AUTOMATON};
  enemy.stats[ENEMY.MIMIC].powers = [GLOBAL.ENEMY_POWER.attack];

  enemy.stats[ENEMY.DEATH_SPEAKER] = {name:"Death Speaker", hp:84, atk_min:8, atk_max:15, gold_min:225, gold_max:275, category:EN_CATEGORY.DEMON};
  enemy.stats[ENEMY.DEATH_SPEAKER].powers = [GLOBAL.ENEMY_POWER.attack, GLOBAL.ENEMY_POWER.scorch];
  
}

// TODO: This is the system
function enemy_onload() {
  enemy.load_counter++;
  if (enemy.load_counter == ENEMY_COUNT) enemy.img_loaded = true;
}

// TODO: This is the system
function enemy_render(enemy_id) {

  // TODO: There needs to be proper error handling here
  if (!enemy.img_loaded) { 
    console.log("yikes");
    console.error("image unable to load " . enemy_id); 
    return;
  }
  
  ctx.drawImage(
    enemy.img[enemy_id],
    0,
    0,
    160 * GLOBAL.PRESCALE,
    120 * GLOBAL.PRESCALE,
    enemy.render_offset.x * GLOBAL.SCALE,
    enemy.render_offset.y * GLOBAL.SCALE,
    160 * GLOBAL.SCALE,
    120 * GLOBAL.SCALE
  );
  
  // optional enemy overlays
  boss_boneshield_render();
}

export { ENEMY, enemy_init };