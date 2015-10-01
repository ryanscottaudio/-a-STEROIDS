# Asteroids

An Asteroids game with a size-based twist written entirely in JavaScript and utilizing an HTML5 canvas element to render graphics.

Use the arrow keys to move and the space bar to shoot. When your ship glows green, it is invulnerable to collision; this effect is engaged only when respawning or entering the next level and will end after 2 seconds, so be sure to quickly move out of the way of any nearby asteroids.

With each asteroid you destroy, your ship grows just a bit larger. When your ship is destroyed, your next ship will be normal-sized; you only get 5 ships, so be careful how you use them.

I did not use JQuery for this project, preferring to challenge myself and limit my code to raw JavaScript and simple `addEventListener` functions; HTML and CSS are only used to influence and scale the size of the canvas. I used the JavaScript Audio object to play .wav files for specific events.

Forgoing the use of sprites, everything in the game is drawn using the canvas and simple `lineTo()`, `fill()`, `arc()`, and `stroke()` functions. This required significant trigonometry and vector algebra; the ship and its exhaust trail in particular required some tinkering. All asteroids are generated with a random amount of sides between five and eight; this also required significant trigonometry.

In the future, I hope to add in randomly generated powerups to increase fire rate, provide extra lives, engage shields at will, and shrink or grow the ship. I will also attempt to create a scoring system and a table of high-scores to show which players have survived the longest.