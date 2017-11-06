This repository contains the main HTML file - index.html - and the JavaScript files - found in the folder JS - for building the classic arcade game Frogger. The file app.js contains the main object-oriented JS code for creating the player, enemy and collectible (gem) objects and also functions for rendering and updating their positions and updating the game level. The file engine.js drives the the game loop engine, draws the initial game board on the screen, and then calls the update and render methods on the player, enemy and gem objects (defined in app.js). The file resources.js is an image loading utility that provides a cache facility for frequently used images, and hence makes the image loading process easier. To run the game, the file index.html has to be opened in the browser.

The objective of the game in each level is to make the player reach the target, i.e, the water without getting hit by the enemy bugs on one of the three rows covered by stone blocks on the game screen. When this is achieved, the game progresses onto the next level. There are three levels in total and the player wins the game when he completes all three levels successfully. The player is given three lives at the start of the game and he loses a life each time he gets hit by a bug. Further, the enemies in each level move faster than those in the previous one, thus making it harder to safely make it to the target without getting hit. When a player loses all three of his lives, the game ends and he has to start all over again from level 1. However, there is a gem to collect in each level popping up at a random position as a reward! The blue gem provides 50 bonus points, the green gem will give 100 and the orange gem will give 200 points. Also, the player's score gets increased by 100 points when he completes a level. In other words, the overall objective of the game is to score the maximum number of points possible losing as few lives as possible (or none).
