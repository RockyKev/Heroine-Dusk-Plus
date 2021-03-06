/**
 Primary game state switcher
 */
 
// var STATE_EXPLORE = 0;
// var STATE_COMBAT = 1;
// var STATE_INFO = 2;
// var STATE_DIALOG = 3;
// var STATE_TITLE = 4; 
 
// var gamestate = STATE_TITLE;
import { title_logic, title_render } from "../view/title.js"
import { bitfont_determinecolor } from "../game/bitfont.js"
import { explore_logic, explore_render } from "../modules/explore.js"
import { info_logic, info_render } from "../view/info.js"
import { combat_logic, combat_render } from "../view/combat.js"
import { dialog_logic, dialog_render } from "../modules/dialog.js"

console.log("js/game_manager/gamestate.js");

export function gamestate_logic() {

  switch(GLOBAL.STATE.gamestate) {
    case STATE_EXPLORE:
	  explore_logic();
	  break;
	case STATE_INFO:
	  info_logic();
	  break;
	case STATE_COMBAT:
	  combat_logic();
	  break;
    case STATE_DIALOG:
      dialog_logic();
      break;
	case STATE_TITLE:
	  title_logic();
	  break;
  } 
}

export function gamestate_render() {

  bitfont_determinecolor();

  switch(GLOBAL.STATE.gamestate) {
    case STATE_EXPLORE:
	  explore_render();
	  break;
	case STATE_INFO:
	  info_render();
	  break;
	case STATE_COMBAT:
	  combat_render();
	  break;
  case STATE_DIALOG:
    dialog_render();
    break;
	case STATE_TITLE:
	  title_render();
	  break;
  }
}

