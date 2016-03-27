#!/usr/bin/env node
var fs = require('fs');

/*
This is invoked as a shell script by NPM when the `tiddlywiki` command is typed
*/

var $tw = require("./boot/boot.js").TiddlyWiki();

var path = '/usr/local/var/cozy/tiddlywiki5/';
var items = fs.readdirSync(path);

var port = process.env.PORT || "9444";


/* Simulation of a proper command line call:
 *
 *     node server.js --server <port> <roottiddler> <rendertype> <servetype>
 *     <username> <password> <host> <pathprefix>
 * */
function startServer() {
  process.chdir(path);
  process.argv.push(path);
  process.argv.push('--server');
  process.argv.push(port); // port
  process.argv.push('$:/core/save/all'); // roottidler
  process.argv.push('text/plain'); // rendertype
  process.argv.push('text/html'); // servertype
  process.argv.push(''); // username, nothing, auth is handled by Cozy
  process.argv.push(''); // password, nothing auth is handled by Cozy
  process.argv.push('127.0.0.1'); // host
  process.argv.push('/apps/tiddlywiki5'); // pathprefix
  console.log(process.argv);
}

if(items.length > 0) {
  startServer();
  $tw.boot.argv = Array.prototype.slice.call(process.argv, 2);
  $tw.boot.boot();

} else {
  process.argv.push(path);
  process.argv.push('--init');
  process.argv.push('server');

  $tw.boot.argv = Array.prototype.slice.call(process.argv, 2);
  $tw.boot.boot();

  process.argv.pop();
  process.argv.pop();
  process.argv.pop();
  startServer();
  $tw.boot.argv = Array.prototype.slice.call(process.argv,2);
  $tw.boot.boot();
};

