#!/usr/bin/env node
var fs = require('fs');

/*
This is invoked as a shell script by NPM when the `tiddlywiki` command is typed
*/

var $tw = require("./boot/boot.js").TiddlyWiki();

var path = '/usr/local/var/cozy/tiddlywiki5/';
var items = fs.readdirSync(path);

console.log(items.length);

if(items.length > 0) {
  process.chdir(path);
  process.argv.push(path);
  process.argv.push('--server');
  process.argv.push(process.env.PORT);
  process.argv.push(path);
} else {
  process.argv.push(path);
  process.argv.push('--init');
  process.argv.push('server');
};

// Pass the command line arguments to the boot kernel
$tw.boot.argv = Array.prototype.slice.call(process.argv,2);


// Boot the TW5 app
$tw.boot.boot();
