// editable data 
content/atlas - Collection of maps and transition data. @rename map_atlas [DONE]
content/enemy -  Data collection for Enemies. Includes the base stats for enemies. Includes the images for enemies. @SPLIT INTO TWO FILES. 
content/mapscript - Scripting for events maps
content/action -- @rename this to combat_actions [done]
content/boss - Boss encounter logic and special art @MOVE code break apart
Content/treasure - set up custom treasure, render treasure graphics. @Split into two files 

// game systems
game/bitfont - manages font. @MOVE to GAME folder. [Done]
game/debug - cheat commands
game/input - Basic input handling.
game/loadbar - manages loading bar @MOVE TO GAME [DONE]
game/music - @MOVE to game [DONE]
game/saveload - Generic cookie writer
game/sounds - @MOVE to the game [DONE]
game/utils - resizeCanvas and isrender

// handles over game data
game_manager/avatar - has initiailze, gamesave, gamereset, and change player status. -- Break up so game_manager handles game_save and game_reset.
game_manager/config - @rename to config.js [DONE]
game_manager/gamestate -  Primary game state switcher

// factory generator 
modules/combat_action - deals with damage
modules/dialog -  Conversation and shop handling
modules/explore - logic and render
modules/mazemap - MazeMap represents the current active map. Atlas is the data.
modules/shop - shop data
modules/tileset - has a graphic loader, and a has a loadbar in it too

// view
view/minimap - Shown in the Info screen. @move to UI or something [DONE]
view/combat - combat logic, combat render, combat message @move to UI
view/info - When you press the info button in-game. Maybe change to like profile page @MOVE to a view [DONE]
view/title - should @MOVE to a view [DONE]


Follow a system where there's a central game_manager. 
That makes calls to the utilities, which are all 