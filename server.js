#!/usr/bin/env node
var fs = require('fs');

/*
This is invoked as a shell script by NPM when the `tiddlywiki` command is typed
*/

var $tw = require("./boot/boot.js").TiddlyWiki();

var path = '/usr/local/var/cozy/tiddlywiki5/';
var items = fs.readdirSync(path);

var port = process.env.PORT || 9444;
console.log(port);
console.log(process.env);

if(items.length > 0) {
  process.chdir(path);
  process.argv.push('--server');
  process.argv.push(port);
  process.argv.push(path);
  $tw.boot.argv = Array.prototype.slice.call(process.argv,2);
  $tw.boot.boot();
} else {
  process.argv.push(path);
  process.argv.push('--init');
  process.argv.push('server');

  $tw.boot.argv = Array.prototype.slice.call(process.argv,2);
  $tw.boot.boot();

  process.argv.pop();
  process.argv.pop();
  process.argv.pop();

  process.chdir(path);
  process.argv.push('--server');
  process.argv.push(port);
  process.argv.push(path);
  $tw.boot.argv = Array.prototype.slice.call(process.argv,2);
  $tw.boot.boot();
};

