/**
 Conversation and shop handling
 */
import { shop_set } from "./shop.js"
import { bitfont_render } from "./bitfont.js"

// var DIALOG_BUTTON_NONE = 0;
// var DIALOG_BUTTON_BUY = 1;
// var DIALOG_BUTTON_EXIT = 2;

// var BUTTON_POS_OPT0 = {x:0, y:60, w:20, h:20};
// var BUTTON_POS_OPT1 = {x:0, y:80, w:20, h:20};
// var BUTTON_POS_OPT2 = {x:0, y:100, w:20, h:20};

// var dialog = new Object();

GLOBAL.DIALOG.select_pos = BUTTON_POS_OPT2;
GLOBAL.DIALOG.button_img = new Image();
GLOBAL.DIALOG.button_img_loaded = false;
GLOBAL.DIALOG.option = new Array();
GLOBAL.DIALOG.message = "";
GLOBAL.DIALOG.shop_id = 0;
GLOBAL.DIALOG.items_for_sale = false;


for (var i=0; i<3; i++) {
  GLOBAL.DIALOG.option[i] = new Object();
}

/**** Initialize ***************/
export function dialog_init() {
  GLOBAL.DIALOG.button_img.src = "images/interface/dialog_buttons.png";
  GLOBAL.DIALOG.button_img.onload = function() {dialog_button_onload();};

  // const shopResponse = shop_set(0);

  shop_set(0);
  
  // GLOBAL.DIALOG.shop_id = shopResponse.shop_id;
  // GLOBAL.DIALOG.title = shopResponse.name;
  // GLOBAL.DIALOG.select_pos = shopResponse.select_pos;
  // GLOBAL.DIALOG.items_for_sale = shopResponse.items_for_sale;

  // // most shops should use the exit button as the third option
  // GLOBAL.DIALOG.option[2].button = shopResponse.option_third.button;
  // GLOBAL.DIALOG.option[2].msg1 = shopResponse.option_third.msg1;
  // GLOBAL.DIALOG.option[2].msg2 = shopResponse.option_third.msg2;


}

function dialog_button_onload() {GLOBAL.DIALOG.button_img_loaded = true;}


/**** Logic Functions ****/


function dialog_logic() {
  // use arrows to move select cursor
  dialog_logic_moveselect();

  // check use options
  if (GLOBAL.DIALOG.option[0].button != DIALOG_BUTTON_NONE) {
    if (dialog_checkuse(BUTTON_POS_OPT0)) {
      shop_act(GLOBAL.DIALOG.shop_id, 0);
    }
  }
  
  if (GLOBAL.DIALOG.option[1].button != DIALOG_BUTTON_NONE) {
    if (dialog_checkuse(BUTTON_POS_OPT1)) {
      shop_act(GLOBAL.DIALOG.shop_id, 1);
    }
  }

  if (GLOBAL.DIALOG.option[2].button != DIALOG_BUTTON_NONE) {
    if (dialog_checkuse(BUTTON_POS_OPT2)) {
      shop_act(GLOBAL.DIALOG.shop_id, 2);
    }
  }

}

// check an action by the button location
function dialog_checkuse(check_pos) {

  // option 1: mouse click
  if (pressing.mouse && !input_lock.mouse && isWithin(mouse_pos, check_pos)) {
	input_lock.mouse = true;
    return true;
  }

  // option 2: action button
  if (pressing.action && !input_lock.action && GLOBAL.DIALOG.select_pos == check_pos) {
    input_lock.action = true;
    return true;
  }

  return false;
}

function dialog_logic_moveselect() {

  // bottom position, can move up
  if (GLOBAL.DIALOG.select_pos == BUTTON_POS_OPT2) {
    if (pressing.up && !input_lock.up) {
      if (GLOBAL.DIALOG.option[1].button != DIALOG_BUTTON_NONE) {
        GLOBAL.DIALOG.select_pos = BUTTON_POS_OPT1;
        input_lock.up = true;
        redraw = true;
        return;
      }
      else if (GLOBAL.DIALOG.option[0].button != DIALOG_BUTTON_NONE) {
        GLOBAL.DIALOG.select_pos = BUTTON_POS_OPT0;
        input_lock.up = true;
        redraw = true;
        return;
      }
    }
  }

  // middle position, can move up or down
  if (GLOBAL.DIALOG.select_pos == BUTTON_POS_OPT1) {
    if (pressing.up && !input_lock.up) {
      if (GLOBAL.DIALOG.option[0].button != DIALOG_BUTTON_NONE) {
        GLOBAL.DIALOG.select_pos = BUTTON_POS_OPT0;
        input_lock.up = true;
        redraw = true;
        return;
      }
    }
    if (pressing.down && !input_lock.down) {
      GLOBAL.DIALOG.select_pos = BUTTON_POS_OPT2;
      input_lock.down = true;
      redraw = true;
      return;     
    }
  }

  // top position, can move down
  if (GLOBAL.DIALOG.select_pos == BUTTON_POS_OPT0) {
    if (pressing.down && !input_lock.down) {
      if (GLOBAL.DIALOG.option[1].button != DIALOG_BUTTON_NONE) {
        GLOBAL.DIALOG.select_pos = BUTTON_POS_OPT1;
        input_lock.down = true;
        redraw = true;
        return;
      }
      else if (GLOBAL.DIALOG.option[2].button != DIALOG_BUTTON_NONE) {
        GLOBAL.DIALOG.select_pos = BUTTON_POS_OPT2;
        input_lock.down = true;
        redraw = true;
        return;
      }
    }
  }

}

/**** Render Functions ****/

function dialog_render() {

  tileset_background_render(shop[GLOBAL.DIALOG.shop_id].background);

  bitfont_render(GLOBAL.DIALOG.title, 80, 2, "center");

  // only render gold if there is something for sale
  if (GLOBAL.DIALOG.items_for_sale) {
    info_render_gold();
  }

  dialog_render_button(GLOBAL.DIALOG.option[0].button, BUTTON_POS_OPT0);
  dialog_render_button(GLOBAL.DIALOG.option[1].button, BUTTON_POS_OPT1);
  dialog_render_button(GLOBAL.DIALOG.option[2].button, BUTTON_POS_OPT2);
  
  dialog_render_text(GLOBAL.DIALOG.option[0], BUTTON_POS_OPT0);
  dialog_render_text(GLOBAL.DIALOG.option[1], BUTTON_POS_OPT1);
  dialog_render_text(GLOBAL.DIALOG.option[2], BUTTON_POS_OPT2);

  action_render_select(GLOBAL.DIALOG.select_pos);

  if (GLOBAL.DIALOG.message != "") {
    bitfont_render(GLOBAL.DIALOG.message, 80, 40, "center");
    GLOBAL.DIALOG.message = "";
  }
}

function dialog_render_text(option, pos) {
  if (option.msg1 == "" && option.msg2 == "") return;

  if (option.msg2 == "") {
    bitfont_render(option.msg1, pos.x + 22, pos.y + 6, "left");
  }
  else {
    bitfont_render(option.msg1, pos.x + 22, pos.y + 1, "left");
    bitfont_render(option.msg2, pos.x + 22, pos.y + 11, "left");
  }
}

function dialog_render_button(button_id, pos) {
  if (button_id == 0) return;

  ctx.drawImage(
    GLOBAL.DIALOG.button_img,
    (button_id-1) * BUTTON_SIZE * PRESCALE,
    0,
    BUTTON_SIZE * PRESCALE,
    BUTTON_SIZE * PRESCALE,	
    (pos.x + BUTTON_OFFSET) * SCALE,
    (pos.y + BUTTON_OFFSET) * SCALE,
    BUTTON_SIZE * SCALE,
    BUTTON_SIZE * SCALE
  );
}




