#!/usr/bin/env node
var fs = require('fs');

/*
This is invoked as a shell script by NPM when the `tiddlywiki` command is typed
*/

var $tw = require("./boot/boot.js").TiddlyWiki();

var path = '/usr/local/var/cozy/tiddlywiki5';
var items = fs.readdirSync(path);

if(items.length > 0) {
  process.argv.push('--server');
  process.argv.push(process.env.PORT);
} else {
  process.argv.push('--init');
  process.argv.push('server');
};

// Pass the command line arguments to the boot kernel
$tw.boot.argv = Array.prototype.slice.call(process.argv,2);


// Boot the TW5 app
$tw.boot.boot();
