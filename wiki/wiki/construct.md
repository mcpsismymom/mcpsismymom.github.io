# Construct
Some (or all?) Construct 2/3 games have a file called offline.js in the same folder as index.html that contains all files necessary to download a game. Below is an example of a possible offline.js file.

```json
{
	"version": 1640023600,
	"fileList": [
		"index.html",
		"main.js",
		"images/spike.png",
		"images/player.png",
		"images/tile.png"
	]
}
```

You could try to parse this, but I just copy what's inside `"fileList"` to get

```json
		"index.html",
		"main.js",
		"images/spike.png",
		"images/player.png",
		"images/tile.png"
```
		

Then, using a capable text editor (I use Kate but [VSCode](https://vscode.dev) would also work), press ctrl+f, replace `",` with nothing (not a space), replace `"` with the link to the game (minus index.html at the end as well as making sure there's `/` at the end), and replace tab (empty space used as indentation, copy and paste from offline.js) with nothing.

You should now have something that looks something like this:

```
https://gamewebsite.com/fungame/index.html
https://gamewebsite.com/fungame/main.js
https://gamewebsite.com/fungame/images/spike.png
https://gamewebsite.com/fungame/images/player.png
https://gamewebsite.com/fungame/images/tile.png
```

You can then put those links into a [Website Downloader](downloaders) such as [HTTrack](httrack).
