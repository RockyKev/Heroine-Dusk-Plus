// click areas reusable by several modules
var clickarea_up = {x:40, y:0, w:80, h:100};
var clickarea_down = {x:40, y:100, w:80, h:20};
var clickarea_left = {x:0, y:20, w:40, h:100};
var clickarea_right = {x:120, y:20, w:40, h:100};

/**
 * Given a point with x,y and a rect with x,y,w,h
 * Determine if the point is within the rect
 */
function isWithin(point, rect) {
  if (point.x < rect.x) return false;
  if (point.y < rect.y) return false;
  if (point.x > rect.x + rect.w) return false;
  if (point.y > rect.y + rect.h) return false;
  return true;
}

function resizeCanvas(globals, can) {

  let width, height, redraw, scale, makeSmooth;

  var aspect_ratio = 4/3;

  if (!globals.STRETCH_TO_SCREEN) {  
      width = 160 * globals.SCALE,
    	height = 120 * globals.SCALE,
    	redraw = true,
      scale = 1,
      makeSmooth = false
    // TODO: Magic numbers?
    // return {
    //   width: 160 * globals.SCALE,
    // 	height: 120 * globals.SCALE,
    // 	redraw: true,
    //   scale: 1,
    //   makeSmooth: false
    // } 
  	
  }  
  // the screen is wider than 4:3
  else if (window.innerWidth * (3/4) > window.innerHeight) {  

      width = can.height * aspect_ratio
      height = window.innerHeight
      redraw = true 
      scale = height / 120,
      makeSmooth = true

   // return {
   //    width: can.height * aspect_ratio,
   //    height: window.innerHeight,
   //    redraw: true, 
   //    scale: height / 120,
   //         makeSmooth: true
   //  } 
    
    // can.height = window.innerHeight;
    // can.width = can.height * aspect_ratio;
    // SCALE = can.height / 120;
  }
  // the screen is taller than 4:3
  else {
   //  can.width = window.innerWidth;
  	// can.height = can.width / aspect_ratio;
  	// SCALE = can.width / 160;
   // return {
   //    width: window.innerWidth,
   //    height: width / aspect_ratio,
   //    redraw: true, 
   //    scale: width / 160,
   //    makeSmooth: true
   //  } 
      width = window.innerWidth
      height = width / aspect_ratio
      redraw = true
      scale = width / 160
      makeSmooth = true

  }
  // redraw = true;
  // setNearestNeighbor();
   return {
      width: width,
      height: height,
      redraw: redraw, 
      scale: scale,
      makeSmooth: makeSmooth
    } 
  
}

// function setNearestNeighbor() {
//   ctx.imageSmoothingEnabled = false;
//   ctx.webkitImageSmoothingEnabled = false;
//   ctx.mozImageSmoothingEnabled = false;
//   ctx.oImageSmoothingEnabled = false;  
// }


export { resizeCanvas };