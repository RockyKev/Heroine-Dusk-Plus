function mazemap_set_music(song_filename) {
  var audio_node = document.getElementById("bgmusic");

  if (OPTIONS.music == false) {
    audio_node.pause();
    mazemap.current_song = "";
    return;
  }
  
  // don't reset song if it's already playing
  if (song_filename == mazemap.current_song) return;

  mazemap.current_song = song_filename;

  var song_path = "music/" + song_filename;
  
  // stop the current song
  audio_node.pause();

  // clear the current song
  audio_node.innerHTML = "";

  // TODO: do we need to play ogg or mp3?
  var newsource = document.createElement('source');
  if (audio_node.canPlayType('audio/mpeg;')) {
    newsource.type = "audio/mpeg";
    newsource.src = song_path + ".mp3";
  } else {
    newsource.type = "audio/ogg";
    newsource.src = song_path + ".ogg";
  }
  audio_node.appendChild(newsource);
  audio_node.load();
  audio_node.play();
  
}

export { mazemap_set_music };