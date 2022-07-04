/**
 * TODO: Is this used? 
 Handle generic image loading and rendering
 Clint Bellanger 2013
 */
 
var images = new Object();

images.init = function(total_image_count) {
  images.total = total_image_count;
  images.started_loading = 0;
  images.finished_loading = 0;
  images.img = new Array();
  
  for (var i=0; i<images.total; i++) {
    images.img[i] = new Image();
  }
}

/**
 Given the relative path and filename, load this image
 Return the index for this image
 Callers should store this index, it's a parameter for images.render()
 */
images.load = function(path_and_filename) {
  images.img[images.started_loading].src = path_and_filename;
  images.img[images.started_loading].onload = function() {images.onload();};
  images.started_loading++;
  return (images.started_loading-1);
}

images.onload = function() {
  images.finished_loading++;
  
  // todo: insert call to loadbar
}

/**
 Render the rectangle of the source image onto the canvas at the specified location
 */
images.render = function(img_id, src_x, src_y, src_w, src_h, dest_x, dest_y) {
    ctx.drawImage(
      images.img[img_id],
      src_x * GLOBAL.PRESCALE,
      src_y * GLOBAL.PRESCALE,
      src_w * GLOBAL.PRESCALE,
      src_h * GLOBAL.PRESCALE,
      dest_x * GLOBAL.SCALE,
      dest_y * GLOBAL.SCALE,
      src_w * GLOBAL.SCALE,
      src_h * GLOBAL.SCALE,
    );
}
