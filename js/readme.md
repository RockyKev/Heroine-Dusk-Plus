game/atlas - Collection of maps and transition data. --rename map_atlas
game/enemy -  Data collection for Enemies. Includes the base stats for enemies. Includes the images for enemies. -- SPLIT INTO TWO FILES. 
game/input - Basic input handling.
game/mapscript - Scripting for various maps
game/saveload - Generic cookie writer
game/system - rename to config.js


modules/action -- rename this to combat_actions
modules/avatar - has initiailze, gamesave, gamereset, and change player status. -- Break up so game_manager handles game_save and game_reset.
modules/bitfont - manages font. @MOVE to GAME folder.
modules/boss - Boss encounter logic and special art @MOVE code break apart
modules/combat - combat logic, combat render, combat message @move to UI
modules/dialog -  Conversation and shop handling
modules/explore - logic and render
modules/gamestate -  Primary game state switcher
modules/info - When you press the info button in-game. Maybe change to like profile page @should move to a view
modules/loadbar - manages loading bar -- MOVE TO GAME
modules/mazemap - MazeMap represents the current active map. Atlas is the data.
modules/minimap - Shown in the Info screen. @move to UI or something
modules/music - @move to game
modules/shop - shop data
modules/sounds - @move to the game
modules/tileset - has a graphic loader, and a has a loadbar in it too
modules/title - should move to a @view
modules/treasure - set up custom treasure, render treasure graphics. @Split into two files 
modules/utils - resizeCanvas and isrender

js/data - This is in-game content.  
js/game - This data shold flow into modules.
  - This is 'game' data for a game to function.
  - input
  - saveload
  - system - rename to config.js

js/modules - this is 'hard factory' data. This is where utility functions live


js/

main - this is the system manager


Follow a system where there's a central game_manager. 
That makes calls to the utilities, which are all 